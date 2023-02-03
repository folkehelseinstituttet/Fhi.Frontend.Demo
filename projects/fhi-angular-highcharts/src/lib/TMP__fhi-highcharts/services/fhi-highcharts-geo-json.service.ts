import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FhiSerie } from '../fhi-highcharts-config.model';
import { SeriesMapOptions } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsGeoJsonService {

  constructor(private http: HttpClient) { }

  private mapFeatures: any[];

  getMap(mapFile: string): Observable<any> {
    const url = `${location.origin}/${mapFile}`;
    return this.http.get<any>(url);
  }

  addMapToHighcharts(Highcharts: any, map: any, diagramtypeId: string) {
    Highcharts.maps[diagramtypeId] = map;
  }

  updateMapFeatures(map: any) {
    this.mapFeatures = map.features;
  }

  getHighmapsSerie(serie: FhiSerie): SeriesMapOptions {
    let mapSerie: SeriesMapOptions;
    serie.data.forEach((p, index) => {
      if (index === 0) {
        mapSerie = {
          data: [[this.findHcKey(p.name), p.y]],
          name: serie.name,
          type: 'map'
        };
      } else {
        mapSerie.data.push([this.findHcKey(p.name), p.y]);
      }
    });
    return mapSerie;
  }

  private findHcKey(name: string): string {
    let hcKey: string;
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
