import { FhiMapTypeId } from '../fhi-diagram-type.constants';
import { FhiDiagramFlag } from './fhi-diagram-flag.models';
import { FhiDiagramSerie } from './fhi-diagram-serie.models';

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  diagramTypeId?: string;
  diagramTypeNavId?: string;
  diagramTypeSubset?: Array<string>;
  disclaimer?: string;
  flags?: Array<FhiDiagramFlag>;
  lastUpdated?: string;
  mapTypeId?: keyof typeof FhiMapTypeId;
  openSource?: boolean;
  series: Array<FhiDiagramSerie>;
  title: string;
}
