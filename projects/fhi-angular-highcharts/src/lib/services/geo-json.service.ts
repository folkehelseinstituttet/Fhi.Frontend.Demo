import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { FhiDiagramSerie } from '../fhi-diagram.models';
import { SeriesMapOptions } from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class GeoJsonService {
  constructor(private http: HttpClient) {}

  private mapFeatures!: any[];

  getMap(mapTypeId: string | undefined): Observable<any> {
    if (mapTypeId !== 'mapFylker' && mapTypeId !== 'mapFylker2019') {
      throw new Error("No supported mapTypeId given, can't get map!");
    }

    let url1!: string;
    const mapFolder = 'assets/fhi-angular-highcharts-geo-json';
    const url2 = `${location.origin}/${mapFolder}/${mapTypeId}.geo.json`;

    if (mapTypeId === 'mapFylker') {
      url1 = 'https://code.highcharts.com/mapdata/countries/no/no-all.geo.json';
    }
    if (mapTypeId === 'mapFylker2019') {
      url1 =
        'https://code.highcharts.com/mapdata/historical/countries/no-2019/no-all-all-2019.geo.json';
    }
    return this.http
      .get<any>(url1)
      .pipe(catchError(() => this.http.get<any>(url2)));
  }

  updateMapFeatures(map: any) {
    this.mapFeatures = map.features;
  }

  getHighmapsSerie(serie: FhiDiagramSerie): SeriesMapOptions {
    let mapSerie!: SeriesMapOptions;
    serie.data.forEach((dataPoint, index) => {
      if (index === 0) {
        mapSerie = {
          data: [[this.findHcKey(dataPoint.name), dataPoint.y as number]],
          name: serie.name as string,
          type: 'map',
        };
      } else if (mapSerie.data !== undefined) {
        mapSerie.data.push([
          this.findHcKey(dataPoint.name),
          dataPoint.y as number,
        ]);
      }
    });
    return mapSerie;
  }

  private findHcKey(name: string): string {
    let hcKey!: string;
    this.mapFeatures.forEach((feature) => {
      if (name === feature.properties.name) {
        hcKey = feature.properties['hc-key'];
      }
    });
    return hcKey;
  }
}
