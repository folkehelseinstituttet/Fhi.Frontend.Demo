import { DiagramSerieData } from './diagram-serie-data.model';

export interface FhiDiagramSerie {
  data: Array<DiagramSerieData>;
  name: string | Array<string>;
  stack?: string;
}
