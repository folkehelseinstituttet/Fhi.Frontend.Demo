import { Options } from 'highcharts';

export interface FhiDiagramType {
  id: string;
  icon?: string;
  name: string;
  group?: string;
  options: Options;
  isMap?: boolean;
  mapFile?: string;
}

export interface Data {
  name: string;
  y: number | string;
}

export interface DataAnonymized {
  name: string;
  y: string;
}

export interface DataAnonymizedSerie {
  name: string;
  dataAnonymized: Array<DataAnonymized>;
}

export interface FhiDiagramSerie {
  data:	Array<Data>;
  dataAnonymized?: Array<DataAnonymized>;
  name:	string;
  colorIndex?: number,
  linkedTo?: string,
  stack?: string;
}

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  data: Array<FhiDiagramSerie>;
  diagramType?: FhiDiagramType;
  diagramTypeNav?: string;
  disclaimer?: string;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}

