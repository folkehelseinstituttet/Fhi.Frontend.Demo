import { FhiDiagramOptions } from './fhi-diagram-options.model';

export interface AllDiagramOptions extends FhiDiagramOptions {
  allMapsLoaded?: boolean;
  seriesHasDecimalDataPoints?: boolean;
  seriesHasNegativeDataPoints?: boolean;
}
