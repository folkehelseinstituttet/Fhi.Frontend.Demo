import { DiagramTypeNavId } from '../constants-and-enums/fhi-diagram-type-nav-id';
import { FhiMapTypeId } from '../fhi-diagram-type.constants';
import { FhiDiagramFlag } from './fhi-diagram-flag.model';
import { FhiDiagramSerie } from './fhi-diagram-serie.model';

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  diagramTypeId?: string;
  diagramTypeNavId?: keyof typeof DiagramTypeNavId;
  diagramTypeSubset?: Array<string>;
  disclaimer?: string;
  flags?: Array<FhiDiagramFlag>;
  lastUpdated?: string;
  mapTypeId?: keyof typeof FhiMapTypeId;
  openSource?: boolean;
  series: Array<FhiDiagramSerie>;
  title: string;
}
