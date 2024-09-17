import { DiagramTypeIds } from '../constants-and-enums/diagram-type-ids';
import { DiagramTypeNavIds } from '../constants-and-enums/diagram-type-nav-ids';
import { MapTypeIds } from '../constants-and-enums/diagram-type-ids';
import { TableOrientations } from '../constants-and-enums/table-orientations';
import { FhiDiagramFlag } from './fhi-diagram-flag.model';
import { FhiDiagramSerie } from './fhi-diagram-serie.model';
import { FhiDiagramUnit } from './fhi-diagram-unit.model';
import { FhiDiagramControls } from './fhi-diagram-controls.model';
import { FhiDiagramFooter } from './fhi-diagram-footer.model';

export type FhiDiagramTypeIds = keyof typeof DiagramTypeIds;
export type FhiTableOrientations = keyof typeof TableOrientations;

export interface FhiDiagramOptions {
  activeDiagramType?: FhiDiagramTypeIds;
  controls?: FhiDiagramControls;
  description?: string;
  footer?: FhiDiagramFooter;
  openSource?: boolean;
  series: FhiDiagramSerie[];
  tableOrientation?: FhiTableOrientations;
  title: string;
  units?: FhiDiagramUnit[];

  // The following will be deprecated in v5
  creditsHref?: string;
  creditsText?: string;
  decimals?: number;
  diagramTypeId?: FhiDiagramTypeIds;
  diagramTypeNavId?: keyof typeof DiagramTypeNavIds;
  diagramTypeSubset?: FhiDiagramTypeIds[];
  disclaimer?: string;
  flags?: FhiDiagramFlag[];
  lastUpdated?: string;
  mapTypeId?: keyof typeof MapTypeIds;
  metadataButton?: boolean;
  showFullScreenButton?: boolean;
}
