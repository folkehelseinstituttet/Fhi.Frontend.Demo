import { DiagramTypeGroups } from '../constants-and-enums/diagram-type-groups';
import { DiagramTypes } from '../constants-and-enums/fhi-diagram-types';

export enum DiagramTypeGroupIndex {
  table = 0,
  map = 1,
  chart = 2,
}

export const NavDiagramTableGroup = {
  diagramType: DiagramTypes.table,
  icon: DiagramTypes.table.icon,
  id: DiagramTypeGroups.table,
  isDisabled: false,
  name: DiagramTypes.table.name,
};
