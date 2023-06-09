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

export interface FhiDiagramFlag {
  symbol: string;
  label: string;
}

export interface FlagWithCategoryName extends FhiDiagramFlag {
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
  diagramTypeId?: string;
  diagramTypeNavId?: string;
  disclaimer?: string;
  flags?: Array<FhiDiagramFlag>;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}

