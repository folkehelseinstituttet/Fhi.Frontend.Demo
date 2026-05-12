import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SeriesMapOptions } from 'highcharts';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FhiDiagramSerieData } from '../models/fhi-diagram-serie-data.model';
import { MapTypeIdValues } from '../constants-and-enums/diagram-type-ids';

import noFylker2024 from '../topojson/no-fylker-2024.topo.json';
import noFylker2023 from '../topojson/no-fylker-2023.topo.json';
import noFylker2019 from '../topojson/no-fylker-2019.topo.json';
import noKommuner2025 from '../topojson/no-kommuner-2025.topo.json';

@Injectable()
export class TopoJsonService {
  private topoJsonMaps: object = {};
  private currentMapTypeId: string;

  setCurrentMapTypeId(mapTypeId: string) {
    this.currentMapTypeId = mapTypeId;
  }

  getMapCopyright(): object {
    return {
      text: this.topoJsonMaps[this.currentMapTypeId]['copyrightShort'],
      url: this.topoJsonMaps[this.currentMapTypeId]['copyrightUrl'],
    };
  }

  getMap(mapTypeId: string | undefined): Observable<object> {
    const maps = {
      [MapTypeIdValues.mapFylker]: noFylker2024,
      [MapTypeIdValues.mapFylker2023]: noFylker2023,
      [MapTypeIdValues.mapFylker2019]: noFylker2019,
      [MapTypeIdValues.mapKommuner]: noKommuner2025,
    };
    const map = maps[mapTypeId];
    if (map) {
      return of(map as object);
    }
    throw new Error('No supported map matches the given mapTypeId.');
  }

  addMap(map: object, mapTypeId: string) {
    this.topoJsonMaps[mapTypeId] = map;
  }

  getHighmapsSerie(serie: FhiDiagramSerie): SeriesMapOptions {
    const mapSerie: SeriesMapOptions = {
      data: serie.data
        .map((dataPoint) => this.getMapSerieDataPoint(dataPoint))
        .filter((dataPoint) => dataPoint !== undefined),
      name: serie.name as string,
      type: 'map',
    };
    return mapSerie;
  }

  private getMapSerieDataPoint(dataPoint: FhiDiagramSerieData): [string, number] | undefined {
    const id = this.currentMapTypeId;
    const geometries = this.topoJsonMaps[id]['objects'].default.geometries;
    let geometry = undefined;
    switch (id) {
      case MapTypeIdValues.mapFylker:
        geometry = geometries.find(
          (geometry: object) =>
            dataPoint.dataPointId &&
            geometry['properties']['iso3166-2'] === `NO-${dataPoint.dataPointId}`,
        );
        break;
      case MapTypeIdValues.mapKommuner:
        geometry = geometries.find(
          (geometry: object) =>
            dataPoint.dataPointId &&
            dataPoint.dataPointId.length === 4 &&
            geometry['properties']['hc-key'].endsWith(dataPoint.dataPointId),
        );
        break;
      case MapTypeIdValues.mapFylker2019:
      case MapTypeIdValues.mapFylker2023:
        geometry = geometries.find(
          (geometry: object) => geometry['properties'].name === dataPoint.name,
        );
        break;
      default:
        console.warn(
          `No supported map matches given mapTypeId: "${id}", can't get map serie data point!`,
        );
        return undefined;
    }
    if (geometry !== undefined) {
      return [geometry['properties']['hc-key'], Number(dataPoint.y)];
    }
    return undefined;
  }
}
