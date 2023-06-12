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
  showNav = false;

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
    if (chartType !== undefined) {
      return {
        diagramType: chartType,
        icon: chartType.icon,
        id: FhiDiagramTypeGroups.chart,
        isDisabled: false,
        name: 'Graf'
      }
    }
  }

  private getNavDiagramMapGroup(): NavDiagramTypeGroup {
    const mapType = this.getDefaultMapType();
    if (mapType !== undefined) {
      return {
        diagramType: mapType,
        icon: mapType.icon,
        id: FhiDiagramTypeGroups.map,
        isDisabled: true,
        name: 'Kart'
      }
    }
  }

  private getDefaultChartType(): FhiDiagramType {
    let currentDiagramTypeId: string;

    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table
        || this.currentDiagramTypeGroup === FhiDiagramTypeGroups.map) {
      currentDiagramTypeId = this.chartTypes[0].id;
    } else {
      currentDiagramTypeId = this.currentDiagramTypeId;
    }
    return this.diagramTypeService.chartTypes
      .find(diagramType => diagramType.id === currentDiagramTypeId);
  }

  private getDefaultMapType(): FhiDiagramType {
    let currentDiagramTypeId: string;

    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.table
        || this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      currentDiagramTypeId = this.mapTypes[0].id;
    } else {
      currentDiagramTypeId = this.currentDiagramTypeId;
    }
    return this.diagramTypeService.mapTypes
      .find(diagramType => diagramType.id === this.mapTypes[0].id);
  }

}
