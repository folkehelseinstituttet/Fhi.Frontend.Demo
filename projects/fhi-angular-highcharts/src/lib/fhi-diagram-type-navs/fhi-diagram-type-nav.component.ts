import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { DiagramType } from '../models/diagram-type.model';
import { NavDiagramTypeGroup } from './nav-diagram-type-group.model';
import { ChartTypes, DiagramTypes, MapTypes } from '../constants-and-enums/fhi-diagram-types';
import { DiagramTypeGroups } from '../constants-and-enums/diagram-type-groups';
import { DiagramTypeGroupIndex, NavDiagramTableGroup } from './fhi-diagram-type-nav.constants';
import { DiagramTypeService } from '../services/diagram-type.service';

@Component({
  selector: 'fhi-diagram-type-nav',
  templateUrl: './fhi-diagram-type-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiDiagramTypeNavComponent implements OnChanges {
  @Input() currentDiagramTypeGroup!: string;
  @Input() currentDiagramTypeId!: string;
  @Input() currentMapTypeId!: string | undefined;
  @Input() currentSeriesLength!: number;

  @Output() diagramTypeNavigation = new EventEmitter<DiagramType>();

  chartSubmenuIsOpen = false;
  chartTypes!: DiagramType[];
  mapTypes!: DiagramType[];
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

  navigate(diagramType: DiagramType) {
    this.diagramTypeNavigation.emit(diagramType);
  }

  diagramTypeGroupIsChart(id: string) {
    if (id === DiagramTypeGroups.chart) {
      return true;
    }
    return false;
  }

  private updateChartSubmenuState() {
    if (this.currentDiagramTypeGroup === DiagramTypeGroups.chart) {
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

    if (this.currentDiagramTypeGroup === DiagramTypeGroups.chart) {
      this.previousChartTypeId = this.currentDiagramTypeId;
    }
    this.previousDiagramTypeId = this.currentDiagramTypeId;
    this.previousSeriesLength = this.currentSeriesLength;
  }

  private getNavDiagramChartGroup(): NavDiagramTypeGroup {
    const chartType = this.getChartType();
    const isDisabled = this.chartTypes.length === 0;
    const excludeFromMenu = this.excludeChartsFromMenu();
    return {
      diagramType: chartType,
      icon: chartType.icon,
      id: DiagramTypeGroups.chart,
      isDisabled: isDisabled,
      name: 'Graf',
      excludeFromMenu: excludeFromMenu,
    };
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
      id: DiagramTypeGroups.map,
      isDisabled: isDisabled,
      name: 'Kart',
      excludeFromMenu: excludeFromMenu,
    };
  }

  // Get user selected chart type, or fallback chart type
  //   if user selected chart isn't legal for current data.
  private getChartType(): DiagramType {
    const chartType = this.chartTypes.find((diagramType) => {
      if (
        this.currentDiagramTypeId === this.previousDiagramTypeId &&
        this.currentSeriesLength !== this.previousSeriesLength
      ) {
        return diagramType.id === this.previousChartTypeId;
      }
      if (this.currentDiagramTypeId === DiagramTypes.table.id) {
        return diagramType.id === this.previousDiagramTypeId;
      }
      return diagramType.id === this.currentDiagramTypeId;
    });
    if (this.chartTypes.length === 0) {
      return ChartTypes[0]; // Need a type even if the group is disabled or excluded from menu
    }
    if (chartType === undefined) {
      return this.chartTypes[0];
    }
    return chartType;
  }

  // Get user selected chart type, or fallback chart type
  //   if user selected chart isn't legal for current data.
  private getMapType(): DiagramType {
    const mapType = this.mapTypes[0]; // Currently just one map type
    if (this.mapTypes.length === 0) {
      return MapTypes[0]; // Need a type even if the group is disabled or excluded from menu
    }
    if (mapType === undefined) {
      return this.mapTypes[0];
    }
    return mapType;
  }
}
