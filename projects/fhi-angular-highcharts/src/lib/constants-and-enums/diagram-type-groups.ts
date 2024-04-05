import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { ChartTypes, DiagramTypes, MapTypes } from './fhi-diagram-types';

export const DiagramTypeGroups = {
  chart: 'chart',
  map: 'map',
  table: 'table',
};

export const DiagramTypeGroups_NEW: DiagramTypeGroup[] = [
  {
    children: [DiagramTypes.table],
    diagramType: DiagramTypes.table,
    id: 'table',
    name: 'Table',
  },
  {
    children: MapTypes,
    diagramType: DiagramTypes.map,
    id: 'map',
    name: 'Kart',
  },
  {
    children: ChartTypes,
    diagramType: DiagramTypes.line,
    id: 'chart',
    name: 'Graf',
  },
];
