import { DiagramTypeGroups } from '../constants-and-enums/diagram-type-groups';
import { FhiDiagramTypes } from '../fhi-diagram-type.constants';

export enum DiagramTypeGroupIndex {
  table = 0,
  map = 1,
  chart = 2,
}

export const NavDiagramTableGroup = {
  diagramType: FhiDiagramTypes.table,
  icon: FhiDiagramTypes.table.icon,
  id: DiagramTypeGroups.table,
  isDisabled: false,
  name: FhiDiagramTypes.table.name,
};
