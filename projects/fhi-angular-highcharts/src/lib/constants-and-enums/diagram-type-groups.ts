import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { ChartTypes, DiagramTypes, MapTypes } from './fhi-diagram-types';

export const DiagramTypeGroups = {
  chart: 'chart',
  map: 'map',
  table: 'table',
};

export const DiagramTypeGroups_NEW: DiagramTypeGroup[] = [
  {
    active: true,
    children: [],
    diagramType: DiagramTypes.table,
    disabled: false,
    id: 'table',
    name: 'Table',
  },
  {
    active: false,
    children: MapTypes,
    diagramType: DiagramTypes.map,
    disabled: false,
    id: 'map',
    name: 'Kart',
  },
  {
    active: false,
    children: ChartTypes,
    diagramType: DiagramTypes.line,
    disabled: false,
    id: 'chart',
    name: 'Graf',
  },
];
