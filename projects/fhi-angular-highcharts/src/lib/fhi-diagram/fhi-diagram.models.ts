import { Options } from 'highcharts';

export interface TableHeaderCell {
  name?: string;
  colspan?: number;
  rowspan?: number;
}

export interface FhiDiagramType {
  id: string;
  icon?: string;
  name: string;
  group?: string;
  options: Options;
  isMap?: boolean;
  mapFile?: string;
}

// TODO: Data[] -> FhiDiagramSerieData[]?
export interface Data {
  name: string;
  y: number | string;
}

// TODO: Flag -> FhiDiagramFlag
export interface Flag {
  symbol: string;
  label: string;
}

export interface FlagWithCategoryName extends Flag {
  name: string;
}

export interface FlaggedSerie {
  name: string;
  flaggedCatgories: Array<FlagWithCategoryName>;
}

export interface FhiDiagramSerie {
  data:	Array<Data>;
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
  flags?: Array<Flag>;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}

