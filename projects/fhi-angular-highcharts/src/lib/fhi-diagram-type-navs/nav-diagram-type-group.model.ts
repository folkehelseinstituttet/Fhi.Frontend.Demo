import { DiagramType } from '../models/diagram-type.model';

export interface NavDiagramTypeGroup {
  diagramType: DiagramType;
  icon: string;
  id: string;
  isDisabled: boolean;
  name: string;
  excludeFromMenu?: boolean;
}
