import { DiagramSerieData } from './diagram-serie-data.models';

export interface FhiDiagramSerie {
  data: Array<DiagramSerieData>;
  name: string | Array<string>;
  stack?: string;
}
