import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups, FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';

interface NavDiagramTypeGroup {
  diagramType: FhiDiagramType;
  icon: string;
  id: string;
  isDisabled: boolean;
  name: string;
}

enum DiagramTypeGroupIndex {
  table = 0,
  map = 1,
  chart = 2
}

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
  navDiagramTypeGroupsOk = false;
  navChartTypes!: FhiDiagramType[];
  navDiagramTypeGroups!: NavDiagramTypeGroup[];

  constructor() {
    this.navChartTypes = this.getNavChartTypes();
    this.navDiagramTypeGroups = this.getNavDiagramTypeGroups();
  }

  ngOnChanges() {
    this.setChartSubmenuIsOpen();
    this.updateNavDiagramTypeGroup();
    this.navDiagramTypeGroupsOk = this.testNavDiagramTypeGroups();
  }



  // TODO: make a test that makes sure all NavDiagramTypeGroups
  //       fulfill all requirements, and if so, returns true
  //       Otherwise return false, and show getErrorMsg
  private testNavDiagramTypeGroups(): boolean {
    return true;
    // this.getErrorMsg()
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

  // TODO: must be set with interaction since it shouldn't be
  //       open by default if a chartType is default diagramType
  private setChartSubmenuIsOpen() {
    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.chartSubmenuIsOpen = true;
      // this.chartSubmenuIsOpen !== this.chartSubmenuIsOpen;
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
    const navDiagramTableGroup = {
      diagramType: FhiDiagramTypes.table,
      icon: FhiDiagramTypes.table.icon,
      id: FhiDiagramTypeGroups.table,
      isDisabled: false,
      name: FhiDiagramTypes.table.name
    };
    const navDiagramMapGroup = this.getNavDiagramMapGroup(FhiDiagramTypes.mapFylker.id);
    const navDiagramChartGroup = this.getNavDiagramChartGroup(FhiDiagramTypes.column.id);

    return [
      navDiagramTableGroup,
      navDiagramMapGroup,
      navDiagramChartGroup
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

  private getErrorMsg() {
    return `ERROR: navDiagramMapGroup or navDiagramChartGroup is undefined
    at FhiDiagramTypeNavComponent.getNavDiagramTypeGroups
    FhiDiagramTypeNav can not be rendered.`;
  }

}
