import { Injectable } from '@angular/core';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FhiDiagramUnit } from '../models/fhi-diagram-unit.model';
import { MetadataForSerie } from '../models/metadata-for-serie.model';

@Injectable()
export class MetadataForSeriesService {
  private metadataForSeries: MetadataForSerie[];

  resetMetadataForSeries() {
    this.metadataForSeries = [];
  }

  get hasPositiveData(): boolean {
    return !!this.metadataForSeries.find((serie) => serie.hasPositiveData);
  }

  get hasNegativeData(): boolean {
    return !!this.metadataForSeries.find((serie) => serie.hasNegativeData);
  }

  get hasDecimalData(): boolean {
    return !!this.metadataForSeries.find((serie) => serie.hasDecimalData);
  }

  getMaxDecimals(serieName: string | string[]): number {
    const metadataForSerie = this.metadataForSeries.find((serie) => serie.name === serieName);
    return metadataForSerie.maxDecimals;
  }

  getDecimalCount(value: number | string): number {
    if (typeof value !== 'number') return 0;
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
  }

  getIsDecimalNumber(value: number | string): boolean {
    return typeof value === 'number' && !Number.isInteger(value);
  }

  updateMetadataForSeries(serie: FhiDiagramSerie, units: FhiDiagramUnit[]) {
    this.metadataForSeries.push({
      name: serie.name,
      hasDecimalData: this.serieHasDecimalDataPoints(serie),
      hasNegativeData: this.serieHasNegativeDataPoints(serie),
      hasPositiveData: this.serieHasPositiveDataPoints(serie),
      maxDecimals: this.getVerifiedMaxDecimalCount(serie, units),
    });
  }

  private getVerifiedMaxDecimalCount(serie: FhiDiagramSerie, units: FhiDiagramUnit[]): number {
    let unit = units?.find((unit) => unit.id === serie.unitId);

    if (!unit && units?.length === 1) {
      unit = units[0];
    }

    if (
      unit?.decimals !== undefined &&
      unit?.decimals !== null &&
      unit?.decimals >= 0 &&
      unit?.decimals <= 9
    ) {
      return unit.decimals;
    }

    if (unit?.decimals > 9) {
      console.warn(
        'Max decimal places is 9 because Highcharts tooltips fails if 10 decimals or more.',
      );
    }

    if (unit?.decimals === null) {
      throw new Error('"null" is not a supported type for "unit.decimals"');
    }

    return 9;
  }

  private serieHasDecimalDataPoints(serie: FhiDiagramSerie): boolean {
    const decimalData = serie.data.filter((dataPoint) => this.getIsDecimalNumber(dataPoint.y));
    return decimalData.length !== 0;
  }

  private serieHasNegativeDataPoints(serie: FhiDiagramSerie): boolean {
    const negativeData = serie.data.filter(
      (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y < 0,
    );
    return negativeData.length > 0;
  }

  private serieHasPositiveDataPoints(serie: FhiDiagramSerie): boolean {
    const positiveData = serie.data.filter(
      (dataPoint) => typeof dataPoint.y === 'number' && dataPoint.y >= 0,
    );
    return positiveData.length > 0;
  }
}
