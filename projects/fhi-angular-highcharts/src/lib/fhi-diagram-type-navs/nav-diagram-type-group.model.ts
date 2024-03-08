import { DiagramType } from '../models/diagram-type.model';

export interface NavDiagramTypeGroup {
  children?: DiagramType[];
  diagramType: DiagramType;
  disabled: boolean;
  icon: string;
  id: string;
  name: string;
  excludeFromMenu?: boolean;
}
