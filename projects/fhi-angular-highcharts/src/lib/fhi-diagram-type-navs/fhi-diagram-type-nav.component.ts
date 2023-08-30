import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiChartTypes, FhiDiagramTypeGroups, FhiDiagramTypes, FhiMapTypes } from '../fhi-diagram-type.constants';
import { FhiDiagramType } from '../fhi-diagram.models';
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
  @Input() currentMapTypeId!: string | undefined;
  @Input() currentSeriesLength!: number;

  @Output() diagramTypeNavigation = new EventEmitter<FhiDiagramType>();

  chartSubmenuIsOpen = false;
  chartTypes!: FhiDiagramType[];
  mapTypes!: FhiDiagramType[];
  navDiagramTypeGroups!: NavDiagramTypeGroup[];
  navId: number;
  previousSeriesLength!: number;
  previousDiagramTypeId!: string;
  previousChartTypeId!: string;

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
    this.navDiagramTypeGroups = [NavDiagramTableGroup];
  }

  private updateNavDiagramTypeGroups() {
    this.navDiagramTypeGroups[DiagramTypeGroupIndex.chart] = this.getNavDiagramChartGroup();
    this.navDiagramTypeGroups[DiagramTypeGroupIndex.map] = this.getNavDiagramMapGroup();

    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.previousChartTypeId = this.currentDiagramTypeId
    }
    this.previousDiagramTypeId = this.currentDiagramTypeId
    this.previousSeriesLength = this.currentSeriesLength;
  }

  private getNavDiagramChartGroup(): NavDiagramTypeGroup {
    const chartType = this.getChartType();
    const isDisabled = this.chartTypes.length === 0;
    const excludeFromMenu = this.excludeChartsFromMenu();
    return {
      diagramType: chartType,
      icon: chartType.icon,
      id: FhiDiagramTypeGroups.chart,
      isDisabled: isDisabled,
      name: 'Graf',
      excludeFromMenu: excludeFromMenu
    }
  }

  private excludeChartsFromMenu() {
    if (
      (this.chartTypes.length === 0 && this.mapTypes[0] !== undefined) ||
      (this.chartTypes.length === 0 && this.currentMapTypeId !== undefined)
    ) {
      return true;
    }
    return false;
  }

  private getNavDiagramMapGroup(): NavDiagramTypeGroup {
    const mapType = this.getMapType();
    const isDisabled = this.mapTypes.length === 0;
    const excludeFromMenu = this.currentMapTypeId === undefined;
    return {
      diagramType: mapType,
      icon: mapType.icon,
      id: FhiDiagramTypeGroups.map,
      isDisabled: isDisabled,
      name: 'Kart',
      excludeFromMenu: excludeFromMenu
    }
  }

  // Get user selected chart type, or fallback chart type
  //   if user selected chart isn't legal for current data.
  private getChartType(): FhiDiagramType {
    const chartType = this.chartTypes.find(diagramType => {
      if (this.currentDiagramTypeId === this.previousDiagramTypeId
          && this.currentSeriesLength !== this.previousSeriesLength) {
        return diagramType.id === this.previousChartTypeId;
      }
      if (this.currentDiagramTypeId === FhiDiagramTypes.table.id) {
        return diagramType.id === this.previousDiagramTypeId;
      }
      return diagramType.id === this.currentDiagramTypeId;
    });
    if (this.chartTypes.length === 0) {
      return FhiChartTypes[0]; // Need a type even if the group is disabled or excluded from menu
    }
    if (chartType === undefined) {
      return this.chartTypes[0];
    }
    return chartType;
  }

  // Get user selected chart type, or fallback chart type
  //   if user selected chart isn't legal for current data.
  private getMapType(): FhiDiagramType {
    const mapType = this.mapTypes[0]; // Currently just one map type
    if (this.mapTypes.length === 0) {
      return FhiMapTypes[0]; // Need a type even if the group is disabled or excluded from menu
    }
    if (mapType === undefined) {
      return this.mapTypes[0];
    }
    return mapType;
  }

}
