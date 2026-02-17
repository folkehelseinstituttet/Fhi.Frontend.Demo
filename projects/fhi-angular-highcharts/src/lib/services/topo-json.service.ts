import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesMapOptions } from 'highcharts';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FhiDiagramSerieData } from '../models/fhi-diagram-serie-data.model';
import { MapTypeIdValues } from '../constants-and-enums/diagram-type-ids';

@Injectable()
export class TopoJsonService {
  private topoJsonMaps: object = {};
  private currentMapTypeId: string;

  constructor(private httpClient: HttpClient) {}

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
    const maps = this.getMapUrls();
    const map = maps.find((map) => map.id === mapTypeId);

    if (map !== undefined) {
      return this.httpClient.get<object>(map.url);
    }
    throw new Error(`No supported map matches given mapTypeId, can't get map!`);
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
    // console.warn(
    //   `Could not find a map area matching dataPointId: "${dataPoint.dataPointId}" in the current TopoJson file.`,
    // );
    return undefined;
  }

  private getMapUrls() {
    const baseUrl = 'https://code.highcharts.com/mapdata/';
    const maps = [
      {
        id: MapTypeIdValues.mapFylker,
        url: baseUrl + 'countries/no/no-all.topo.json',
      },
      {
        id: MapTypeIdValues.mapFylker2019,
        url: baseUrl + 'historical/countries/no-2019/no-all-2019.topo.json',
      },
      {
        id: MapTypeIdValues.mapFylker2023,
        url: baseUrl + 'historical/countries/no-2023/no-all-2023.topo.json',
      },
    ];
    return maps;
  }
}
