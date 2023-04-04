import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups, FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';
import { NavDiagramTypeGroup } from './fhi-diagram-type-nav.models';
import { DiagramTypeGroupIndex, NavDiagramTableGroup } from './fhi-diagram-type-nav.constants';

@Component({
  selector: 'fhi-diagram-type-nav',
  templateUrl: './fhi-diagram-type-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiDiagramTypeNavComponent {

  @Input() currentDiagramTypeGroup!: string;
  @Input() currentDiagramType!: FhiDiagramType;

  @Output() navigateToDiagramType = new EventEmitter<FhiDiagramType>();

  chartSubmenuIsOpen = false;
  navChartTypes!: FhiDiagramType[];
  navDiagramTypeGroups!: NavDiagramTypeGroup[];
  navId: number;
  showNav = false;

  constructor() {
    this.navChartTypes = this.getNavChartTypes();
    this.navDiagramTypeGroups = this.getNavDiagramTypeGroups();
    this.navId = Math.floor(Math.random() * 100);
  }

  ngOnChanges() {
    this.setChartSubmenuIsOpen();
    this.updateNavDiagramTypeGroup();
    this.showNav = this.testNavDiagramTypeGroups();
  }

  navigate(diagramType: FhiDiagramType) {
    this.navigateToDiagramType.emit(diagramType);
  }

  diagramTypeGroupIsChart(id: string) {
    if (id === FhiDiagramTypeGroups.chart) {
      return true;
    }
    return false;
  }

  private setChartSubmenuIsOpen() {
    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.chartSubmenuIsOpen = true;
    } else {
      this.chartSubmenuIsOpen = false;
    }
  }

  private updateNavDiagramTypeGroup() {
    const chartId = this.currentDiagramType.id;
    const chartType = this.getNavChartTypes().find(chartType => chartType.id === chartId);

    if (chartType !== undefined
        && this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.updateNavDiagramChartGroup(chartId);
    }
  }

  private getNavChartTypes(): FhiDiagramType[] {
    return [
      FhiDiagramTypes.line,
      FhiDiagramTypes.column,
      FhiDiagramTypes.bar,
      FhiDiagramTypes.columnStacked,
      FhiDiagramTypes.barStacked
    ];
  }

  private getNavMapTypes(): FhiDiagramType[] {
    return [
      FhiDiagramTypes.mapFylker,
      FhiDiagramTypes.mapFylker2019
    ];
  }

  private updateNavDiagramChartGroup(diagramTypeId: string) {
    this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart]
      = this.getNavDiagramChartGroup(diagramTypeId);
  }

  private getNavDiagramTypeGroups(): NavDiagramTypeGroup[] {
    return [
      NavDiagramTableGroup,
      this.getNavDiagramMapGroup(FhiDiagramTypes.mapFylker.id),
      this.getNavDiagramChartGroup(FhiDiagramTypes.column.id)
    ];
  }

  private getNavDiagramMapGroup(diagramTypeId: string): NavDiagramTypeGroup {
    let navDiagramTypeGroups: NavDiagramTypeGroup[] = [];

    this.getNavMapTypes().forEach(type => {
      navDiagramTypeGroups.push({
        diagramType: type,
        icon: type.icon,
        id: FhiDiagramTypeGroups.map,
        isDisabled: true,
        name: 'Kart'
      });
    });
    return navDiagramTypeGroups
      .find((group) => group.diagramType.id === diagramTypeId);
  }

  private getNavDiagramChartGroup(diagramTypeId: string): NavDiagramTypeGroup {
    let navDiagramTypeGroups: NavDiagramTypeGroup[] = [];

    this.getNavChartTypes().forEach(type => {
      navDiagramTypeGroups.push({
        diagramType: type,
        icon: type.icon,
        id: FhiDiagramTypeGroups.chart,
        isDisabled: false,
        name: 'Graf'
      });
    });
    return navDiagramTypeGroups
      .find((group) => group.diagramType.id === diagramTypeId);
  }

  private testNavDiagramTypeGroups(): boolean {
    if (
      this.navDiagramTypeGroups[DiagramTypeGroupIndex.table] !== undefined
      && this.navDiagramTypeGroups[DiagramTypeGroupIndex.map] !== undefined
      && this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart] !== undefined
    ) {
      return true;
    }
    console.error(this.getErrorMsg());
    return false;
  }

  private getErrorMsg() {
    return `ERROR: navDiagramMapGroup or navDiagramChartGroup is undefined
    at FhiDiagramTypeNavComponent.getNavDiagramTypeGroups
    FhiDiagramTypeNav can not be rendered.`;
  }

}
