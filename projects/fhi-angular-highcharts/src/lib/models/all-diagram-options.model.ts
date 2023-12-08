import { DiagramType } from './diagram-type.model';
import { FhiDiagramOptions } from './fhi-diagram-options.model';

export interface AllDiagramOptions extends FhiDiagramOptions {
  allMapsLoaded?: boolean;
  diagramType?: DiagramType;
  seriesHasDecimalDataPoints?: boolean;
  seriesHasNegativeDataPoints?: boolean;
}
