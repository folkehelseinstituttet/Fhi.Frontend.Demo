import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FhiDiagramSerie } from '../fhi-diagram.models';
import { SeriesMapOptions } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class GeoJsonService {

  constructor(private http: HttpClient) { }

  private mapFeatures!: any[];

  getMap(mapFile: string | undefined): Observable<any> {
    if (mapFile === undefined) {
      throw new Error('No mapFile given, can\'t get map!');
    }
    const url = `${location.origin}/${mapFile}`;
    return this.http.get<any>(url);
  }

  addMapToHighcharts(Highcharts: any, map: any, FhiDiagramTypeId: string) {
    Highcharts.maps[FhiDiagramTypeId] = map;
  }

  updateMapFeatures(map: any) {
    this.mapFeatures = map.features;
  }

  getHighmapsSerie(serie: FhiDiagramSerie): SeriesMapOptions {
    let mapSerie!: SeriesMapOptions;
    serie.data.forEach((p, index) => {
      if (index === 0) {
        mapSerie = {
          data: [[this.findHcKey(p.name), p.y]],
          name: serie.name,
          type: 'map'
        };
      } else if (mapSerie.data !== undefined) {
        mapSerie.data.push([this.findHcKey(p.name), p.y]);
      }
    });
    return mapSerie;
  }

  private findHcKey(name: string): string {
    let hcKey!: string;
    name = this.updateNamesNotMatchingMap(name);
    this.mapFeatures.forEach(feature => {
      if (name === feature.properties.name) {
        hcKey = feature.properties['hc-key'];
      }
    });
    return hcKey;
  }

  private updateNamesNotMatchingMap(name: string): string {
    if (name === 'Oslo (f)') {
      return 'Oslo';
    } else {
      return name;
    }
  }

}
