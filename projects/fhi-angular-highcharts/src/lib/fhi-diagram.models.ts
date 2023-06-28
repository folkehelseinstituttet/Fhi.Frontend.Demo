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
  options?: Options;
  isMap?: boolean;
  mapFile?: string;
}

export interface Data {
  name: string;
  y: number | string;
}

export interface FlagWithDataPointName extends FhiDiagramFlag {
  name: string;
}

export interface FlaggedSerie {
  name:	string;
  flaggedDataPoints: Array<FlagWithDataPointName>;
}


// Public interfaces

export interface FhiDiagramFlag {
  symbol: string;
  label: string;
}

export interface FhiDiagramSerie {
  center?: Array<String>;
  data:	Array<Data>;
}

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  diagramTypeId?: string;
  diagramTypeNavId?: string;
  disclaimer?: string;
  flags?: Array<FhiDiagramFlag>;
  lastUpdated?: string;
  openSource?: boolean;
  series: Array<FhiDiagramSerie>;
  title: string;
}

export interface FhiAllDiagramOptions extends FhiDiagramOptions {
  allMapsLoaded?: boolean;
  diagramType?: FhiDiagramType;
  seriesHasDecimalDataPoints?: boolean;
  seriesHasNegativeDataPoints?: boolean;
}

