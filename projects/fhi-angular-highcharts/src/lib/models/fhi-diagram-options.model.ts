import { DiagramTypeIds } from '../constants-and-enums/diagram-type-ids';
import { DiagramTypeNavIds } from '../constants-and-enums/diagram-type-nav-ids';
import { MapTypeIds } from '../constants-and-enums/map-type-ids';
import { FhiDiagramFlag } from './fhi-diagram-flag.model';
import { FhiDiagramSerie } from './fhi-diagram-serie.model';

export type FhiDiagramTypeIds = keyof typeof DiagramTypeIds;

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  diagramTypeId?: FhiDiagramTypeIds;
  diagramTypeNavId?: keyof typeof DiagramTypeNavIds;
  diagramTypeSubset?: Array<FhiDiagramTypeIds>;
  disclaimer?: string;
  flags?: Array<FhiDiagramFlag>;
  lastUpdated?: string;
  mapTypeId?: keyof typeof MapTypeIds;
  openSource?: boolean;
  series: Array<FhiDiagramSerie>;
  title: string;
}
