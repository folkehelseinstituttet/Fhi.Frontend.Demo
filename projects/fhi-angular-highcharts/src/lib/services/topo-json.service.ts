import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Data, FhiDiagramSerie } from '../fhi-diagram.models';
import { SeriesMapDataOptions, SeriesMapOptions } from 'highcharts';

@Injectable()
export class TopoJsonService {
  private HC_mapFolder = 'https://code.highcharts.com/mapdata/countries';
  private HC_mapFolderHistorical = 'https://code.highcharts.com/mapdata/historical/countries';
  private appMapFolder = 'assets/fhi-angular-highcharts-topo-json';
  private mapGeometries: object[];
  private topoJsonMaps: object = {};

  constructor(private http: HttpClient) {}

  getMap(mapTypeId: string | undefined): Observable<object> {
    // const mapTypeId = (() => FhiMapTypeIds.find((id) => id === this.mapTypeId))();

    if (mapTypeId !== 'mapFylker' && mapTypeId !== 'mapFylker2019') {
      throw new Error("No supported mapTypeId given, can't get map!");
    }
    const fallbackUrl = `${location.origin}/${this.appMapFolder}/${mapTypeId}.topo.json`;
    let url!: string;

    if (mapTypeId === 'mapFylker') {
      url = this.HC_mapFolder + '/no/no-all.topo.json';
    }
    if (mapTypeId === 'mapFylker2019') {
      url = this.HC_mapFolderHistorical + '/no-2019/no-all-2019.topo.json';
    }
    return this.http.get<object>(url).pipe(catchError(() => this.http.get<object>(fallbackUrl)));
  }

  updateMapGeometries(map: object, mapTypeId: string) {
    console.log('map-topo', map);
    this.mapGeometries = map['objects'].default.geometries;
    this.topoJsonMaps[mapTypeId] = map;
    console.log('this.mapGeometries', this.mapGeometries);
  }

  getHighmapsSerie(serie: FhiDiagramSerie): SeriesMapOptions {
    console.log('serie', serie);

    let mapSerie!: SeriesMapOptions;
    serie.data.forEach((dataPoint, index) => {
      if (index === 0) {
        mapSerie = {
          data: [this.newMapMethod2(dataPoint)],
          mapData: this.topoJsonMaps['mapTypeId'],
          name: serie.name as string,
          type: 'map',
        };
      } else if (mapSerie.data !== undefined) {
        mapSerie.data.push(this.newMapMethod2(dataPoint));
      }
    });
    console.log('mapSerie', mapSerie);
    return mapSerie;
  }
  newMapMethod2(dataPoint: Data): [string, number] {
    console.log('dataPoint', dataPoint);
    const geometry = this.mapGeometries.find(
      (geometry) => geometry['properties'].name === dataPoint.name,
    );
    console.log('geometry)', geometry);
    return [geometry['properties']['hc-key'], dataPoint.y as number];
  }

  newMapMethod(dataPoint: Data): SeriesMapDataOptions {
    // console.log('dataPoint', dataPoint);
    const geometry = this.mapGeometries.find(
      (geometry) => geometry['properties'].name === dataPoint.name,
    );
    // console.log('geometry)', geometry);
    return {
      id: geometry['id'],
      geometry: {
        coordinates: [geometry['arcs']],
        type: geometry['type'],
      },
      name: dataPoint.name,
      value: dataPoint.y as number,
    };
  }

  getHighmapsSerie_OLD(serie: FhiDiagramSerie): SeriesMapOptions {
    let mapSerie!: SeriesMapOptions;
    serie.data.forEach((dataPoint, index) => {
      if (index === 0) {
        mapSerie = {
          data: [[this.findHcKey(dataPoint.name), dataPoint.y as number]],
          name: serie.name as string,
          type: 'map',
        };
      } else if (mapSerie.data !== undefined) {
        mapSerie.data.push([this.findHcKey(dataPoint.name), dataPoint.y as number]);
      }
    });
    return mapSerie;
  }

  private findHcKey(name: string): string {
    let hcKey!: string;
    this.mapGeometries.forEach((geometry) => {
      if (name === geometry['properties'].name) {
        hcKey = geometry['properties']['hc-key'];
        console.log('name', geometry['properties'].name);
        console.log('hcKey', hcKey);
      }
    });
    return hcKey;
  }
}
