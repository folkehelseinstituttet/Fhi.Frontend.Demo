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
    name: 'Tabell',
  },
  {
    children: MapTypes,
    diagramType: DiagramTypes.map,
    name: 'Kart',
  },
  {
    children: ChartTypes,
    diagramType: DiagramTypes.line,
    name: 'Graf',
  },
];
