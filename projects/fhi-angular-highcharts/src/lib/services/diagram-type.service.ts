import { Injectable } from '@angular/core';

import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramTypeIdValues, MapTypeIdValuesArray } from '../constants-and-enums/diagram-type-ids';

import {
  AllDiagramTypes,
  ChartTypes,
  DiagramTypes,
  MapTypes,
} from '../constants-and-enums/fhi-diagram-types';

@Injectable()
export class DiagramTypeService {
  private _chartTypes!: DiagramType[];
  private _mapTypes!: DiagramType[];
  private _disabledDiagramTypeIds!: string[];
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

  updateDiagramTypes(
    diagramTypeSubset: string[] | undefined,
    mapTypeId: string | undefined,
    series: FhiDiagramSerie[],
    flaggedSeries: FlaggedSerie[],
  ) {
    this.series = series;
    this.diagramTypeSubset = diagramTypeSubset;
    this.flaggedSeries = flaggedSeries;
    this.mapTypeId = mapTypeId;
    this._chartTypes = this.getChartTypes();
    this._mapTypes = this.getMapTypes();
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
    const diagramType = this.chartTypes.find((diagramType) => diagramType.id === diagramTypeId);
    return diagramType;
  }

  private getMapType(diagramTypeId: string): DiagramType | undefined {
    const diagramType = this.mapTypes.find((diagramType) => diagramType.id === diagramTypeId);
    return diagramType;
  }

  private getChartTypes(): DiagramType[] {
    if (this.diagramTypeSubset !== undefined) {
      return ChartTypes.filter((type) => this.diagramTypeSubset?.includes(type.id));
    }
    return ChartTypes;
  }

  private getMapTypes(): DiagramType[] {
    const mapTypeId = MapTypeIdValuesArray.find((id) => id === this.mapTypeId);
    if (mapTypeId === undefined) {
      return [];
    }
    if (this.diagramTypeSubset !== undefined) {
      return MapTypes.filter((type) => this.diagramTypeSubset?.includes(type.id));
    }
    return MapTypes;
  }

  private getDisabledDiagramTypeIds(): string[] {
    const numOfDataPointsPrSerie = this.getNumberOfDataPointsPrSerie();
    const series = this.series;
    const diagramTypeIds: string[] = [];

    // Add line
    if (numOfDataPointsPrSerie === 1 || (series.length > 1 && this.flaggedSeries.length !== 0)) {
      diagramTypeIds.push(DiagramTypeIdValues.line);
    }

    // Add map & pie
    if (series.length > 1) {
      diagramTypeIds.push(DiagramTypeIdValues.map);
      diagramTypeIds.push(DiagramTypeIdValues.pie);
    }

    // Add bar & column
    if (numOfDataPointsPrSerie > 5 && series.length > 8) {
      diagramTypeIds.push(DiagramTypeIdValues.bar);
      diagramTypeIds.push(DiagramTypeIdValues.column);
    }

    return diagramTypeIds;
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series have the same length.
    return this.series[0].data.length;
  }
}
