import { FhiDiagramOptions } from './fhi-diagram-options.model';

export interface AllDiagramOptions extends FhiDiagramOptions {
  seriesHasDecimalDataPoints?: boolean;
  seriesHasNegativeDataPoints?: boolean;
}
