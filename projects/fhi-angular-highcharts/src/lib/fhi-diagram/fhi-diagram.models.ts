import { Options } from 'highcharts';
import { FhiDiagramTypeMenus } from '../fhi-diagram-type-navigation/fhi-diagram-type-menus';

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
  diagramTypeMenu?: FhiDiagramTypeMenus | undefined;
  disclaimer?: string;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}

