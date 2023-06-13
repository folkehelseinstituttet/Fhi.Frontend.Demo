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

  @Output() diagramTypeNavigation = new EventEmitter<FhiDiagramType>();

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
    this.diagramTypeNavigation.emit(diagramType);
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
    if (this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart] === undefined
        || this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart] = this.getNavDiagramChartGroup();
    }
    if (this.navDiagramTypeGroups[DiagramTypeGroupIndex.map] === undefined
        || this.currentDiagramTypeGroup === FhiDiagramTypeGroups.map) {
      this.navDiagramTypeGroups[DiagramTypeGroupIndex.map] = this.getNavDiagramMapGroup();
    }
  }

  private getNavDiagramChartGroup(): NavDiagramTypeGroup {
    const chartType = this.getChartType();
    return {
      diagramType: chartType,
      icon: chartType.icon,
      id: FhiDiagramTypeGroups.chart,
      isDisabled: false,
      name: 'Graf'
    }
  }

  private getNavDiagramMapGroup(): NavDiagramTypeGroup {
    const mapType = this.getMapType();
    return {
      diagramType: mapType,
      icon: mapType.icon,
      id: FhiDiagramTypeGroups.map,
      isDisabled: true,
      name: 'Kart'
    }
  }

  private getChartType(): FhiDiagramType {
    const chartType = this.chartTypes
      .find(diagramType => diagramType.id === this.currentDiagramTypeId);
    if (chartType === undefined) {
      return this.chartTypes[0];
    }
    return chartType;
  }

  private getMapType(): FhiDiagramType {
    const mapType = this.mapTypes
      .find(diagramType => diagramType.id === this.currentDiagramTypeId);
    if (mapType === undefined) {
      return this.mapTypes[0];
    }
    return mapType;
  }

}
