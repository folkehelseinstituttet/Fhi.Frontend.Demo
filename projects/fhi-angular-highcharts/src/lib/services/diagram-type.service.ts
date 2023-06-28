import { Injectable } from '@angular/core';

import { FhiDiagramSerie, FhiDiagramType, FlaggedSerie } from '../fhi-diagram.models';
import { FhiAllDiagramTypes, FhiChartTypes, FhiDiagramTypeId, FhiDiagramTypes, FhiMapTypes } from '../fhi-diagram-type.constants';
import { FhiDiagramSerieNameSeperator as Seperator } from '../fhi-diagram-serie-name-seperator.constant';

@Injectable({
  providedIn: 'root'
})
export class DiagramTypeService {
  private _chartTypes!: FhiDiagramType[];
  private _mapTypes!: FhiDiagramType[];
  private _series!: FhiDiagramSerie[];
  private flaggedSeries!: FlaggedSerie[]

  get series(): FhiDiagramSerie[] {
    return this._series;
  }

  get chartTypes(): FhiDiagramType[] {
    return this._chartTypes;
  }

  get mapTypes(): FhiDiagramType[] {
    return this._mapTypes;
  }

  updateDiagramTypes(series: FhiDiagramSerie[], flaggedSeries: FlaggedSerie[]) {
    this._series = series;
    this.flaggedSeries = flaggedSeries;
    this.updateAvailableTypes();
  }

  getDiagramTypeById(diagramTypeId: string): FhiDiagramType {
    const diagramType = FhiAllDiagramTypes
      .find(diagramType => diagramType.id === diagramTypeId);
    if (diagramType !== undefined) {
      return diagramType;
    } else {
      throw new Error(`diagramType is undefined!
        At DiagramTypeService.getDiagramTypeById()`);
    }
  }

  getVerifiedDiagramTypeId(diagramTypeId: string): string {
    let diagramType: FhiDiagramType;

    diagramType = this.getChartType(diagramTypeId);
    if (diagramType !== undefined) {
      return diagramType.id;
    }
    diagramType = this.getMapType(diagramTypeId);
    if (diagramType !== undefined) {
      return diagramType.id;
    }
    return FhiDiagramTypes.table.id;
  }

  private getChartType(diagramTypeId: string): FhiDiagramType {
    const diagramType = this.chartTypes
      .find(diagramType => diagramType.id === diagramTypeId);
    return diagramType;
  }

  private getMapType(diagramTypeId: string): FhiDiagramType {
    const diagramType = this.mapTypes
      .find(diagramType => diagramType.id === diagramTypeId);
    return diagramType;
  }

  private updateAvailableTypes() {
    this._chartTypes = this.updateAvailableChartTypes();
    this._mapTypes = this.updateAvailableMapTypes();
  }

  private updateAvailableChartTypes(): FhiDiagramType[] {
    let chartTypes = FhiChartTypes;
    const numOfDimensions = this.getNumberOfDimensions();
    const numOfDataPointsPrSerie = this.getNumberOfDataPointsPrSerie();
    const numOfSeries = this.getNumberOfSeries();

    // Remove line
    if (
      (numOfDimensions > 1 && numOfSeries > 5) ||
      (numOfSeries > 1 && this.flaggedSeries.length !== 0)
    ) {
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.line);
    }

    // Remove pie
    if (numOfSeries > 2) {
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.pie);
    }

    // Remove stacked
    if (numOfSeries === 1) {
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.barStacked);
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.columnStacked);
    }

    // Remove bar & column
    if (numOfDataPointsPrSerie > 5 && numOfSeries > 8) {
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.bar);
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.column);
    }

    return chartTypes;
  }

  private updateAvailableMapTypes(): FhiDiagramType[] {
    const mapTypes = FhiMapTypes;
    return mapTypes;
  }

  private getNumberOfSeries(): number {
    return this._series.length;
  }

  private getNumberOfDataPointsPrSerie(): number {
    return this._series[0].data.length;
  }

  private getNumberOfDimensions(): number {
    const nameFirstSerie = this._series[0].name as string;
    return nameFirstSerie.split(Seperator.input).length + 1; // (n column dimentions) + (1 row dimention)
  }

}
