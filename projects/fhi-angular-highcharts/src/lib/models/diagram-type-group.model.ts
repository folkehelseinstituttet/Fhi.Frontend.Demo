import { DiagramType } from './diagram-type.model';

export interface DiagramTypeGroup {
  active: boolean;
  children: DiagramType[];
  diagramType: DiagramType;
  disabled: boolean;
  id: string;
  name: string;
}
