import { DiagramTypeIds } from '../constants-and-enums/diagram-type-ids';
import { TableOrientations } from '../constants-and-enums/table-orientations';
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
}
