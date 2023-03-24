import { Options } from 'highcharts';
import { FhiDiagramTypeNavigations } from '../fhi-diagram-type-navigation/fhi-diagram-type-navigations';

export interface FhiDiagramType {
  id: string;
  icon?: string;
  nameNO?: string;
  nameEN?: string;
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
  colorIndex:	number;
  legendIndex: number;
}

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  data: Array<FhiDiagramSerie>;
  diagramType?: FhiDiagramType | undefined;
  diagramTypeNavigation?: FhiDiagramTypeNavigations | undefined;
  disclaimer?: string;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}

