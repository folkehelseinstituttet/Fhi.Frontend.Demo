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

interface TopoJsonMapGeometryProperties {
  name?: string;
  region?: string;
  'hc-key'?: string;
  'hc-group'?: string;
  'hc-a2'?: string;
  'hc-middle-lon'?: number;
  'hc-middle-lat'?: number;
  'iso3166-2'?: string;
}

interface TopoJsonMapGeometry {
  properties: TopoJsonMapGeometryProperties;
}

interface TopoJsonMap {
  copyrightShort?: string;
  copyrightUrl?: string;
  objects: {
    default: {
      geometries: TopoJsonMapGeometry[];
    };
  };
}

@Injectable()
export class TopoJsonService {
  private topoJsonMaps: Record<string, TopoJsonMap> = {};
  private currentMapTypeId = '';

  setCurrentMapTypeId(mapTypeId: string) {
    this.currentMapTypeId = mapTypeId;
  }

  getMapCopyright(): object {
    const currentMap = this.getStoredOrStaticMap(this.currentMapTypeId);

    return {
      text: currentMap.copyrightShort,
      url: currentMap.copyrightUrl,
    };
  }

  getMap(mapTypeId: string | undefined): Observable<object> {
    if (!mapTypeId) {
      throw new Error('No mapTypeId was provided.');
    }

    return of(this.getStaticMap(mapTypeId) as object);
  }

  addMap(map: object, mapTypeId: string) {
    this.topoJsonMaps[mapTypeId] = map as TopoJsonMap;
  }

  getHighmapsSerie(serie: FhiDiagramSerie): SeriesMapOptions {
    return this.getHighmapsSerieForMapType(serie.name as string, serie.data, this.currentMapTypeId);
  }

  getHighmapsSerieForMapType(
    seriesName: string,
    seriesData: FhiDiagramSerieData[],
    mapTypeId: string,
  ): SeriesMapOptions {
    const mapSerieData = seriesData
      .map((dataPoint) => this.createMapDataPointForMapType(dataPoint, mapTypeId))
      .filter((dataPoint): dataPoint is [string, number] => dataPoint !== null);

    return {
      data: mapSerieData,
      name: seriesName,
      type: 'map',
    };
  }

  private createMapDataPointForMapType(
    dataPoint: FhiDiagramSerieData,
    mapTypeId: string,
  ): [string, number] | null {
    const geometries = this.getGeometriesForMapType(mapTypeId);

    switch (mapTypeId) {
      case MapTypeIdValues.mapFylker:
        return this.createFylkeMapDataPoint(dataPoint, geometries);

      case MapTypeIdValues.mapKommuner:
        return this.createKommuneMapDataPoint(dataPoint, geometries);

      case MapTypeIdValues.mapFylker2019:
      case MapTypeIdValues.mapFylker2023:
        return this.createNamedFylkeMapDataPoint(dataPoint, geometries);

      default:
        throw new Error(`No supported map matches given mapTypeId: "${mapTypeId}".`);
    }
  }

  private createFylkeMapDataPoint(
    dataPoint: FhiDiagramSerieData,
    geometries: TopoJsonMapGeometry[],
  ): [string, number] | null {
    const dataPointId = this.getTextValueOrNull(dataPoint.dataPointId);

    if (dataPointId === null) {
      return null;
    }

    const expectedIsoCode = `NO-${dataPointId}`;

    const matchingGeometry =
      geometries.find((geometry) => geometry.properties['iso3166-2'] === expectedIsoCode) ?? null;

    return this.createMapDataPointFromGeometry(matchingGeometry, dataPoint);
  }

  private createKommuneMapDataPoint(
    dataPoint: FhiDiagramSerieData,
    geometries: TopoJsonMapGeometry[],
  ): [string, number] | null {
    const dataPointId = this.getTextValueOrNull(dataPoint.dataPointId);

    if (dataPointId === null || dataPointId.length !== 4) {
      return null;
    }

    const matchingGeometry =
      geometries.find((geometry) => geometry.properties['hc-key']?.endsWith(dataPointId)) ?? null;

    return this.createMapDataPointFromGeometry(matchingGeometry, dataPoint);
  }

  private createNamedFylkeMapDataPoint(
    dataPoint: FhiDiagramSerieData,
    geometries: TopoJsonMapGeometry[],
  ): [string, number] | null {
    const dataPointName = this.getTextValueOrNull(dataPoint.name);

    if (dataPointName === null) {
      return null;
    }

    const matchingGeometry =
      geometries.find((geometry) => geometry.properties.name === dataPointName) ?? null;

    return this.createMapDataPointFromGeometry(matchingGeometry, dataPoint);
  }

  private createMapDataPointFromGeometry(
    geometry: TopoJsonMapGeometry | null,
    dataPoint: FhiDiagramSerieData,
  ): [string, number] | null {
    if (geometry === null) {
      return null;
    }

    const mapKey = geometry.properties['hc-key'];

    if (!mapKey) {
      return null;
    }

    const mapValue = Number(dataPoint.y);

    if (!Number.isFinite(mapValue)) {
      return null;
    }

    return [mapKey, mapValue];
  }

  private getGeometriesForMapType(mapTypeId: string): TopoJsonMapGeometry[] {
    return this.getStoredOrStaticMap(mapTypeId).objects.default.geometries;
  }

  private getStoredOrStaticMap(mapTypeId: string): TopoJsonMap {
    return this.topoJsonMaps[mapTypeId] ?? this.getStaticMap(mapTypeId);
  }

  private getStaticMap(mapTypeId: string): TopoJsonMap {
    switch (mapTypeId) {
      case MapTypeIdValues.mapFylker:
        return noFylker2024 as TopoJsonMap;

      case MapTypeIdValues.mapFylker2023:
        return noFylker2023 as TopoJsonMap;

      case MapTypeIdValues.mapFylker2019:
        return noFylker2019 as TopoJsonMap;

      case MapTypeIdValues.mapKommuner:
        return noKommuner2025 as TopoJsonMap;

      default:
        throw new Error(`No supported map matches the given mapTypeId: "${mapTypeId}".`);
    }
  }

  private getTextValueOrNull(value: string | number | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    return String(value);
  }

  getMapDataForMapTypeAndParentMapKey(mapTypeId: string, parentMapKey: string): object {
    const mapData = this.getStoredOrStaticMap(mapTypeId);
    const childGeometries = this.getGeometriesForParentMapKey(
      mapData.objects.default.geometries,
      parentMapKey,
    );

    if (childGeometries.length === 0) {
      console.warn(
        `No child map geometries found for parentMapKey "${parentMapKey}". Using full mapData as fallback.`,
      );

      return mapData as object;
    }

    return {
      ...mapData,
      objects: {
        ...mapData.objects,
        default: {
          ...mapData.objects.default,
          geometries: childGeometries,
        },
      },
    } as object;
  }

  private getGeometriesForParentMapKey(
    geometries: TopoJsonMapGeometry[],
    parentMapKey: string,
  ): TopoJsonMapGeometry[] {
    const childMapKeyPrefix = `${parentMapKey}-`;

    return geometries.filter((geometry) =>
      this.geometryBelongsToParentMapKey(geometry, childMapKeyPrefix),
    );
  }

  private geometryBelongsToParentMapKey(
    geometry: TopoJsonMapGeometry,
    childMapKeyPrefix: string,
  ): boolean {
    const mapKey = geometry.properties['hc-key'];

    return typeof mapKey === 'string' && mapKey.startsWith(childMapKeyPrefix);
  }

  /* Kept for reference. Replaced by the test createMapDataPointForMapType and the helper fucntions.
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
  */
}
