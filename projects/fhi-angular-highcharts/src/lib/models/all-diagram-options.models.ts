import { DiagramType } from './diagram-type.models';
import { FhiDiagramOptions } from './fhi-diagram-options.models';

export interface AllDiagramOptions extends FhiDiagramOptions {
  allMapsLoaded?: boolean;
  diagramType?: DiagramType;
  seriesHasDecimalDataPoints?: boolean;
  seriesHasNegativeDataPoints?: boolean;
}
