import { DiagramType } from './diagram-type.model';

export interface DiagramTypeGroup {
  children: DiagramType[];
  diagramType: DiagramType;
  disabled: boolean;
  icon: string;
  id: string;
  name: string;
}
