import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';

export interface NavDiagramTypeGroup {
  diagramType: FhiDiagramType;
  icon: string;
  id: string;
  isDisabled: boolean;
  name: string;
}
