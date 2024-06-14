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
    let mapSerie!: SeriesMapOptions;
    serie.data.forEach((dataPoint, index) => {
      if (index === 0) {
        mapSerie = {
          data: [this.getMapSerieDataPoint(dataPoint)],
          name: serie.name as string,
          type: 'map',
        };
      } else if (mapSerie.data !== undefined) {
        mapSerie.data.push(this.getMapSerieDataPoint(dataPoint));
      }
    });
    return mapSerie;
  }

  private getMapSerieDataPoint(dataPoint: FhiDiagramSerieData): [string, number] {
    const id = this.currentMapTypeId;
    const geometries = this.topoJsonMaps[id]['objects'].default.geometries;
    const geometry = geometries.find(
      (geometry: object) => geometry['properties'].name === dataPoint.name,
    );
    if (geometry !== undefined) {
      return [geometry['properties']['hc-key'], dataPoint.y as number];
    }
    console.warn(
      `Data point name "${dataPoint.name}" doesn't match any geo names in given TopoJson file.`,
    );
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
