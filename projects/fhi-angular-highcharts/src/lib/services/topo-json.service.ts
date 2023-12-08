import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SeriesMapOptions } from 'highcharts';

import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { DiagramSerieData } from '../models/diagram-serie-data.model';
import {
  MapTypeIdValues,
  MapTypeIdValuesArray as MapIds,
} from '../constants-and-enums/map-type-ids';

@Injectable()
export class TopoJsonService {
  private HC_mapFylker = 'https://code.highcharts.com/mapdata/countries/no/no-all.topo.json';
  private HC_mapFylker2019 =
    'https://code.highcharts.com/mapdata/historical/countries/no-2019/no-all-2019.topo.json';
  private appMapFolder = 'assets/fhi-angular-highcharts-topo-json';
  private topoJsonMaps: object = {};
  private currentMapTypeId: string;

  constructor(private http: HttpClient) {}

  setCurrentMapTypeId(mapTypeId: string) {
    this.currentMapTypeId = mapTypeId;
  }

  getMap(mapTypeId: string | undefined): Observable<object> {
    if (MapIds.find((id) => id === mapTypeId) === undefined) {
      throw new Error("No supported mapTypeId given, can't get map!");
    }
    const fallbackUrl = `${location.origin}/${this.appMapFolder}/${mapTypeId}.topo.json`;
    const url = mapTypeId === MapTypeIdValues.mapFylker ? this.HC_mapFylker : this.HC_mapFylker2019;
    return this.http.get<object>(url).pipe(catchError(() => this.http.get<object>(fallbackUrl)));
  }

  addMap(map: object, mapTypeId: string) {
    this.topoJsonMaps[mapTypeId] = map;
  }

  getHighmapsSerie(serie: FhiDiagramSerie): SeriesMapOptions {
    let mapSerie!: SeriesMapOptions;
    serie.data.forEach((dataPoint, index) => {
      if (index === 0) {
        mapSerie = {
          data: [this.getMapSerieData(dataPoint)],
          name: serie.name as string,
          type: 'map',
        };
      } else if (mapSerie.data !== undefined) {
        mapSerie.data.push(this.getMapSerieData(dataPoint));
      }
    });
    return mapSerie;
  }

  private getMapSerieData(dataPoint: DiagramSerieData): [string, number] {
    const id = this.currentMapTypeId;
    const geometries = this.topoJsonMaps[id]['objects'].default.geometries;
    const geometry = geometries.find(
      (geometry: object) => geometry['properties'].name === dataPoint.name,
    );
    return [geometry['properties']['hc-key'], dataPoint.y as number];
  }
}
