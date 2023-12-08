import { FhiDiagramType } from '../fhi-diagram.models';
import { FhiDiagramOptions } from './fhi-diagram-options.models';

export interface AllDiagramOptions extends FhiDiagramOptions {
  allMapsLoaded?: boolean;
  diagramType?: FhiDiagramType;
  seriesHasDecimalDataPoints?: boolean;
  seriesHasNegativeDataPoints?: boolean;
}
