import {
  FhiDiagramTypeGroups,
  FhiDiagramTypes,
} from '../fhi-diagram-type.constants';

export class FhiDiagramTypeNavId {
  static default = 'default';
}

export enum DiagramTypeGroupIndex {
  table = 0,
  map = 1,
  chart = 2,
}

export const NavDiagramTableGroup = {
  diagramType: FhiDiagramTypes.table,
  icon: FhiDiagramTypes.table.icon,
  id: FhiDiagramTypeGroups.table,
  isDisabled: false,
  name: FhiDiagramTypes.table.name,
};
