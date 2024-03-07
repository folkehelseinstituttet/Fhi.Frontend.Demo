import { DiagramType } from '../models/diagram-type.model';

export interface NavDiagramTypeGroup {
  diagramType: DiagramType;
  disabled: boolean;
  icon: string;
  id: string;
  name: string;
  excludeFromMenu?: boolean;
}
