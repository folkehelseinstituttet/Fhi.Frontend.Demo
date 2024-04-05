import { DiagramType } from './diagram-type.model';

export interface DiagramTypeGroup {
  children: DiagramType[];
  diagramType: DiagramType;
  id: string;
  name: string;
}
