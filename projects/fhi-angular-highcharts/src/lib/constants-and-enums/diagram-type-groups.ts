import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { ChartTypes, DiagramTypes, MapTypes } from './fhi-diagram-types';

export const DiagramTypeGroups = {
  chart: 'chart',
  map: 'map',
  table: 'table',
};

export enum DiagramTypeGroupIndex {
  tableGroup = 0,
  mapGroup = 1,
  chartGroup = 2,
}

export const DiagramTypeGroups_NEW: DiagramTypeGroup[] = [
  {
    children: [DiagramTypes.table],
    diagramType: DiagramTypes.table,
    name: 'Table',
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
