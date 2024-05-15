import { FhiDiagramSerieData } from './fhi-diagram-serie-data.model';

export interface FhiDiagramSerie {
  data: Array<FhiDiagramSerieData>;
  name: string | Array<string>;
  stack?: string;
  unitId?: number | string;
}
