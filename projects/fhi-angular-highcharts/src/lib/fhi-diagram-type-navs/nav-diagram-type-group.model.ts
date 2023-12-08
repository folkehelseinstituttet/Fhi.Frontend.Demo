import { DiagramType } from '../models/diagram-type.models';

export interface NavDiagramTypeGroup {
  diagramType: DiagramType;
  icon: string;
  id: string;
  isDisabled: boolean;
  name: string;
  excludeFromMenu?: boolean;
}
