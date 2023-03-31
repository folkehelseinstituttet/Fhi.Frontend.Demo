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

interface Data {
  name: string;
  y: number;
}

export interface FhiDiagramSerie {
  data:	Array<Data>;
  name:	string;
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

