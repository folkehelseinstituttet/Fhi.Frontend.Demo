import { Injectable } from '@angular/core';

import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { NavDiagramTypeGroup } from '../fhi-diagram-type-navs/nav-diagram-type-group.model';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';
import { MapTypeIdValuesArray } from '../constants-and-enums/map-type-ids';

import {
  AllDiagramTypes,
  ChartTypes,
  DiagramTypes,
  MapTypes,
} from '../constants-and-enums/fhi-diagram-types';
import { NavDiagramTableGroup } from '../fhi-diagram-type-navs/fhi-diagram-type-nav.constants';
import { DiagramTypeGroups } from '../constants-and-enums/diagram-type-groups';

@Injectable()
export class DiagramTypeService {
  private _chartTypes!: DiagramType[];
  private _mapTypes!: DiagramType[];
  private _disabledDiagramTypeIds!: string[];
  private _navDiagramTypeGroups!: NavDiagramTypeGroup[];

  private series!: FhiDiagramSerie[];
  private diagramTypeSubset!: string[] | undefined;
  private flaggedSeries!: FlaggedSerie[];
  private mapTypeId!: string | undefined;

  get chartTypes(): DiagramType[] {
    return this._chartTypes;
  }

  get mapTypes(): DiagramType[] {
    return this._mapTypes;
  }

  get disabledDiagramTypeIds(): string[] {
    return this._disabledDiagramTypeIds;
  }

  updateAvailableDiagramTypes(
    diagramTypeSubset: string[] | undefined,
    mapTypeId: string | undefined, // TODO: should be part of diagramTypeSubset, ie. not one map diagram type (with seperate map ids)
    series: FhiDiagramSerie[],
    flaggedSeries: FlaggedSerie[],
  ) {
    this.series = series;
    this.diagramTypeSubset = diagramTypeSubset;
    this.flaggedSeries = flaggedSeries;
    this.mapTypeId = mapTypeId;

    this._chartTypes = this.getChartTypes();
    this._mapTypes = this.getMapTypes();
    this.updateAllDiagramTypesDisabledState();

    this._navDiagramTypeGroups = this.getNavDiagramTypeGroups();
    console.log('this._navDiagramTypeGroups', this._navDiagramTypeGroups);

    // TODO: Deprecated version (but still in use!)
    this._disabledDiagramTypeIds = this.getDisabledDiagramTypeIds();
  }

  getDiagramTypeById(diagramTypeId: string | undefined): DiagramType {
    const diagramType = AllDiagramTypes.find((diagramType) => diagramType.id === diagramTypeId);
    if (diagramType !== undefined) {
      return diagramType;
    } else {
      throw new Error(`diagramType is undefined!
        At DiagramTypeService.getDiagramTypeById()`);
    }
  }

  // TODO: shouldn't be a chart map split here... or...
  getVerifiedDiagramTypeId(diagramTypeId: string): string {
    const chart = this.getChartType(diagramTypeId);
    const map = this.getMapType(diagramTypeId);
    if (chart !== undefined) {
      return chart.id;
    }
    if (map !== undefined) {
      return map.id;
    }
    return DiagramTypes.table.id;
  }

  private getChartType(diagramTypeId: string): DiagramType | undefined {
    return this._chartTypes.find((diagramType) => diagramType.id === diagramTypeId);
  }

  private getMapType(diagramTypeId: string): DiagramType | undefined {
    return this.mapTypes.find((diagramType) => diagramType.id === diagramTypeId);
  }

  private getChartTypes(): DiagramType[] {
    if (this.diagramTypeSubset !== undefined) {
      return ChartTypes.filter((type) => this.diagramTypeSubset?.includes(type.id));
    }
    return ChartTypes;
  }

  // TODO:
  //   - set return value to undefind (but can't do that before new logic is implemented in FhiDiagramTypeNavComponent)
  //   - make logic same as for ChartTypes (but what about just table, no charts?)
  //   - update API and doc accordingly
  //   NB! This is breaking changes!
  private getMapTypes(): DiagramType[] {
    const mapTypeId = MapTypeIdValuesArray.find((id) => id === this.mapTypeId);
    if (mapTypeId !== undefined && this.diagramTypeSubset !== undefined) {
      return MapTypes.filter((type) => this.diagramTypeSubset?.includes(type.id));
    }
    return [];
  }

  private getNavDiagramTypeGroups(): NavDiagramTypeGroup[] {
    const groups = [NavDiagramTableGroup];
    if (this._mapTypes.length !== 0) {
      groups.push(this.getNavDiagramMapGroup(this._mapTypes[0]));
    }
    groups.push(this.getNavDiagramChartGroup(this._chartTypes[0]));
    return groups;
  }

  private getNavDiagramChartGroup(chartType: DiagramType): NavDiagramTypeGroup {
    return {
      children: this._chartTypes,
      diagramType: chartType,
      icon: chartType.icon,
      id: DiagramTypeGroups.chart,
      disabled: false,
      name: 'Graf',
    };
  }

  private getNavDiagramMapGroup(mapType: DiagramType): NavDiagramTypeGroup {
    return {
      children: this._mapTypes,
      diagramType: mapType,
      icon: mapType.icon,
      id: DiagramTypeGroups.map,
      disabled: false,
      name: 'Kart',
    };
  }

  private updateAllDiagramTypesDisabledState() {
    this.resetAllDiagramTypeDisabledStates();
    this.getDisabledDiagramTypeIds().forEach((id) => {
      const chartType = this._chartTypes.find((type) => type.id === id);
      const mapType = this._mapTypes.find((type) => type.id === id);

      if (chartType !== undefined) {
        chartType.disabled = true;
      }
      if (mapType !== undefined) {
        mapType.disabled = true;
      }
    });
  }

  private resetAllDiagramTypeDisabledStates() {
    this._chartTypes.forEach((type) => {
      type.disabled = false;
    });
    if (this._mapTypes[0] !== undefined) {
      this._mapTypes.forEach((type) => {
        type.disabled = false;
      });
    }
  }

  private getDisabledDiagramTypeIds(): string[] {
    const numOfDataPointsPrSerie = this.getNumberOfDataPointsPrSerie();
    const series = this.series;
    const diagramTypeIds: string[] = [];

    if (numOfDataPointsPrSerie === 1 || (series.length > 1 && this.flaggedSeries.length !== 0)) {
      diagramTypeIds.push(DiagramTypeIdValues.line);
    }

    if (series.length > 1) {
      diagramTypeIds.push(DiagramTypeIdValues.map);
      diagramTypeIds.push(DiagramTypeIdValues.pie);
    }

    if (numOfDataPointsPrSerie > 5 && series.length > 8) {
      diagramTypeIds.push(DiagramTypeIdValues.bar);
      diagramTypeIds.push(DiagramTypeIdValues.column);
    }

    //console.log('DISABLED diagramTypeIds', diagramTypeIds);
    return diagramTypeIds;
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series have the same length.
    return this.series[0].data.length;
  }
}
