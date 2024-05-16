import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { ChartTypes, DiagramTypes, MapTypes } from './fhi-diagram-types';

export const DiagramTypeGroups = {
  chart: 'chart',
  map: 'map',
  table: 'table',
};

export const DiagramTypeGroupNames = {
  chart: 'Graf',
  map: 'Kart',
  table: 'Tabell',
};

export const DiagramTypeGroups_NEW: DiagramTypeGroup[] = [
  {
    children: [DiagramTypes.table],
    diagramType: DiagramTypes.table,
    name: DiagramTypeGroupNames.table,
  },
  {
    children: MapTypes,
    diagramType: DiagramTypes.map,
    name: DiagramTypeGroupNames.map,
  },
  {
    children: ChartTypes,
    diagramType: DiagramTypes.line,
    name: DiagramTypeGroupNames.chart,
  },
];
