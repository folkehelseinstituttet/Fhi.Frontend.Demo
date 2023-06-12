import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups } from '../fhi-diagram/fhi-diagram-type.constants';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';
import { NavDiagramTypeGroup } from './fhi-diagram-type-nav.models';
import { DiagramTypeGroupIndex, NavDiagramTableGroup } from './fhi-diagram-type-nav.constants';
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

  constructor(private diagramTypeService: DiagramTypeService) {
    this.initNavDiagramTypeGroups();
    this.navId = Math.floor(Math.random() * 100);
  }

  ngOnChanges() {
    this.chartTypes = this.diagramTypeService.chartTypes;
    this.mapTypes = this.diagramTypeService.mapTypes;
    this.updateNavDiagramTypeGroups();
    this.updateChartSubmenuState();
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

  private initNavDiagramTypeGroups() {
    this.navDiagramTypeGroups = [NavDiagramTableGroup, undefined, undefined];
  }

  private updateNavDiagramTypeGroups() {
    this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart] = this.getNavDiagramChartGroup();
    this.navDiagramTypeGroups[DiagramTypeGroupIndex.map] = this.getNavDiagramMapGroup();
  }

  private getNavDiagramChartGroup(): NavDiagramTypeGroup {
    const chartType = this.getDefaultChartType();
    return {
      diagramType: chartType,
      icon: chartType.icon,
      id: FhiDiagramTypeGroups.chart,
      isDisabled: false,
      name: 'Graf'
    }
  }

  private getNavDiagramMapGroup(): NavDiagramTypeGroup {
    const mapType = this.getDefaultMapType();
    return {
      diagramType: mapType,
      icon: mapType.icon,
      id: FhiDiagramTypeGroups.map,
      isDisabled: true,
      name: 'Kart'
    }
  }

  private getDefaultChartType(): FhiDiagramType {
    const diagramTypeId = this.getDiagramTypeId(FhiDiagramTypeGroups.chart);
    const diagramType = this.chartTypes
      .find(diagramType => diagramType.id === diagramTypeId);
    if (diagramType === undefined) {
      return this.chartTypes[0];
    }
    return diagramType;
  }

  private getDefaultMapType(): FhiDiagramType {
    const diagramTypeId = this.getDiagramTypeId(FhiDiagramTypeGroups.map);
    const diagramType = this.mapTypes
      .find(diagramType => diagramType.id === diagramTypeId);
    if (diagramType === undefined) {
      return this.mapTypes[0];
    }
    return diagramType;
  }

  private getDiagramTypeId(groupId: string): string {
    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table
        || this.currentDiagramTypeGroup === groupId) {
      return (groupId === FhiDiagramTypeGroups.chart)
        ? this.chartTypes[0].id
        : this.mapTypes[0].id;
    }
    return this.currentDiagramTypeId;
  }

}
