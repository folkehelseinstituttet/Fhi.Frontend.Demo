import { Injectable } from '@angular/core';

import { FhiDiagramSerie, FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';
import { FhiChartTypes, FhiMapTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramTypeId } from '../fhi-diagram/fhi-diagram-type-id';

@Injectable({
  providedIn: 'root'
})
export class DiagramTypeService {
  private _chartTypes!: FhiDiagramType[];
  private _mapTypes!: FhiDiagramType[];
  private _data!: FhiDiagramSerie[];

  set data(data: FhiDiagramSerie[]) {
    this._data = data;
    this.updateAvailableTypes();
  }

  get chartTypes(): FhiDiagramType[] {
    return this._chartTypes;
  }

  get mapTypes(): FhiDiagramType[] {
    return this._mapTypes;
  }

  private updateAvailableTypes() {
    this._chartTypes = this.updateAvailableChartTypes();
    this._mapTypes = this.updateAvailableMapTypes();
  }

  private updateAvailableChartTypes(): FhiDiagramType[] {
    let chartTypes = FhiChartTypes;
    const numOfDimensions = this.getNumberOfDimensions();
    const numOfSeries = this.getNumberOfSeries();

    // Remove pie
    if (numOfSeries > 1) {
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.pie);
    }

    // Remove stacked
    if (numOfSeries === 1) {
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.barStacked);
      chartTypes = chartTypes.filter(type => type.id !== FhiDiagramTypeId.columnStacked);
    }

    // Remove bar & column
    if (numOfDimensions > 2) {
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
    return this._data.length;
  }

  private getNumberOfDimensions(): number {
    const nameFirstSerie = this._data[0].name;
    return nameFirstSerie.split(',').length + 1;
  }

}
