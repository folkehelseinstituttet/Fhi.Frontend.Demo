import { Injectable } from '@angular/core';

import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import {
  FhiAllDiagramTypes,
  FhiChartTypes,
  FhiDiagramTypeId,
  FhiMapTypeIds,
  FhiDiagramTypes,
  FhiMapTypes,
} from '../fhi-diagram-type.constants';
import { DiagramSerieNameSeperator as Seperator } from '../constants-and-enums/diagram-serie-name-seperator';

@Injectable()
export class DiagramTypeService {
  private _chartTypes!: DiagramType[];
  private _mapTypes!: DiagramType[];
  private _series!: FhiDiagramSerie[];
  private diagramTypeSubset!: string[] | undefined;
  private flaggedSeries!: FlaggedSerie[];
  private mapTypeId!: string | undefined;

  get series(): FhiDiagramSerie[] {
    return this._series;
  }

  get chartTypes(): DiagramType[] {
    return this._chartTypes;
  }

  get mapTypes(): DiagramType[] {
    return this._mapTypes;
  }

  updateDiagramTypes(
    diagramTypeSubset: string[] | undefined,
    mapTypeId: string | undefined,
    series: FhiDiagramSerie[],
    flaggedSeries: FlaggedSerie[],
  ) {
    this._series = series;
    this.diagramTypeSubset = diagramTypeSubset;
    this.flaggedSeries = flaggedSeries;
    this.mapTypeId = mapTypeId;
    this.updateAvailableTypes();
  }

  getDiagramTypeById(diagramTypeId: string | undefined): DiagramType {
    const diagramType = FhiAllDiagramTypes.find((diagramType) => diagramType.id === diagramTypeId);
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
    return FhiDiagramTypes.table.id;
  }

  private getChartType(diagramTypeId: string): DiagramType | undefined {
    const diagramType = this.chartTypes.find((diagramType) => diagramType.id === diagramTypeId);
    return diagramType;
  }

  private getMapType(diagramTypeId: string): DiagramType | undefined {
    const diagramType = this.mapTypes.find((diagramType) => diagramType.id === diagramTypeId);
    return diagramType;
  }

  private updateAvailableTypes() {
    this._chartTypes = this.updateAvailableChartTypes();
    this._mapTypes = this.updateAvailableMapTypes();
  }

  private updateAvailableChartTypes(): DiagramType[] {
    const numOfDimensions = this.getNumberOfDimensions();
    const numOfDataPointsPrSerie = this.getNumberOfDataPointsPrSerie();
    const series = this._series;
    let chartTypes = FhiChartTypes;

    // Remove line
    if (
      numOfDataPointsPrSerie === 1 ||
      (numOfDimensions > 1 && series.length > 5) ||
      (series.length > 1 && this.flaggedSeries.length !== 0)
    ) {
      chartTypes = chartTypes.filter((type) => type.id !== FhiDiagramTypeId.line);
    }

    // Remove donut and pie
    if (series.length > 1) {
      chartTypes = chartTypes.filter((type) => type.id !== FhiDiagramTypeId.pie);
      // chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.donut);
    }

    // Remove stacked
    if (series.length === 1) {
      chartTypes = chartTypes.filter((type) => type.id !== FhiDiagramTypeId.barStacked);
      chartTypes = chartTypes.filter((type) => type.id !== FhiDiagramTypeId.columnStacked);
    }

    // Remove bar & column
    if (numOfDataPointsPrSerie > 5 && series.length > 8) {
      chartTypes = chartTypes.filter((type) => type.id !== FhiDiagramTypeId.bar);
      chartTypes = chartTypes.filter((type) => type.id !== FhiDiagramTypeId.column);
    }

    // Remove types not in user defined subset
    if (this.diagramTypeSubset !== undefined) {
      chartTypes = chartTypes.filter((type) => this.diagramTypeSubset?.includes(type.id));
    }

    return chartTypes;
  }

  private updateAvailableMapTypes(): DiagramType[] {
    const series = this._series;
    const mapTypeId = FhiMapTypeIds.find((id) => id === this.mapTypeId);
    let mapTypes = FhiMapTypes;

    // Remove all maps
    if (mapTypeId === undefined || series.length > 1) {
      mapTypes = [];
    }
    return mapTypes;
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series have the same length.
    return this._series[0].data.length;
  }

  private getNumberOfDimensions(): number {
    const nameFirstSerie = this._series[0].name as string;
    return nameFirstSerie.split(Seperator.input).length + 1; // (n column dimentions) + (1 row dimention)
  }
}
