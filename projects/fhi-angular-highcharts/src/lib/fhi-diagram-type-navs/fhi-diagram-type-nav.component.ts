import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups } from '../fhi-diagram/fhi-diagram-type.constants';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';
import { NavDiagramTypeGroup } from './fhi-diagram-type-nav.models';
import { DiagramTypeGroupIndex } from './fhi-diagram-type-nav.constants';
import { DiagramTypeService } from '../services/diagram-type.service';

@Component({
  selector: 'fhi-diagram-type-nav',
  templateUrl: './fhi-diagram-type-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiDiagramTypeNavComponent {

  @Input() currentDiagramTypeGroup!: string;
  @Input() currentDiagramTypeId!: string;

  @Output() navigateToDiagramType = new EventEmitter<FhiDiagramType>();

  chartSubmenuIsOpen = false;
  chartTypes!: FhiDiagramType[];
  mapTypes!: FhiDiagramType[];
  navDiagramTypeGroups!: NavDiagramTypeGroup[];
  navId: number;
  showNav = false;

  constructor(private diagramTypeService: DiagramTypeService) {
    this.chartTypes = this.diagramTypeService.chartTypes;
    this.mapTypes = this.diagramTypeService.mapTypes;
    this.navId = Math.floor(Math.random() * 100);
  }

  ngOnChanges() {
    this.updateNavDiagramTypeGroup();
    this.updateChartSubmenuState();
    this.showNav = this.isPossibleToShowNav();
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

  private updateChartSubmenuState() {
    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.chartSubmenuIsOpen = true;
    } else {
      this.chartSubmenuIsOpen = false;
    }
  }

  private updateNavDiagramTypeGroup() {
    const chartId = this.currentDiagramTypeId;
    const chartType = this.diagramTypeService.chartTypes
      .find(chartType => chartType.id === chartId);

    if (chartType !== undefined
        && this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.updateNavDiagramChartGroup(chartId);
    }
  }

  private updateNavDiagramChartGroup(diagramTypeId: string) {
    this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart]
      = this.getNavDiagramChartGroup(diagramTypeId);
  }

  private getNavDiagramChartGroup(diagramTypeId: string): NavDiagramTypeGroup {
    let navDiagramTypeGroups: NavDiagramTypeGroup[] = [];

    this.chartTypes.forEach(type => {
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

  private isPossibleToShowNav(): boolean {
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
