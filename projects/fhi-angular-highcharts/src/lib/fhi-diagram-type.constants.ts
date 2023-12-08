import { OptionsChartTypeBar } from './highcharts-options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from './highcharts-options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from './highcharts-options/options-chart-type-column';
import { OptionsChartTypeColumnStacked } from './highcharts-options/options-chart-type-column-stacked';
import { OptionsChartTypeLine } from './highcharts-options/options-chart-type-line';
import { OptionsChartTypePie } from './highcharts-options/options-chart-type-pie';

import { DiagramType } from './models/diagram-type.model';

import { DiagramTypeIdValues as DiagramTypeIds } from './constants-and-enums/diagram-type-ids';

const bar: DiagramType = {
  id: DiagramTypeIds.bar,
  icon: 'bar-chart-line-horizontal',
  name: 'Liggende søylediagram',
  options: OptionsChartTypeBar,
};

const barStacked: DiagramType = {
  id: DiagramTypeIds.barStacked,
  icon: 'bar-chart-line-stacked-horizontal',
  name: 'Stablet liggende søylediagram',
  options: OptionsChartTypeBarStacked,
};

const column: DiagramType = {
  id: DiagramTypeIds.column,
  icon: 'bar-chart-line',
  name: 'Søylediagram',
  options: OptionsChartTypeColumn,
};

const columnStacked: DiagramType = {
  id: DiagramTypeIds.columnStacked,
  icon: 'bar-chart-line-stacked',
  name: 'Stablet søylediagram',
  options: OptionsChartTypeColumnStacked,
};

const line: DiagramType = {
  id: DiagramTypeIds.line,
  icon: 'graph-up',
  name: 'Linjediagram',
  options: OptionsChartTypeLine,
};

const map: DiagramType = {
  id: DiagramTypeIds.map,
  icon: 'geo-alt',
  name: 'Kart',
  options: {
    chart: {
      map: undefined,
    },
  },
};

const pie: DiagramType = {
  id: DiagramTypeIds.pie,
  icon: 'pie-chart',
  name: 'Kakediagram',
  options: OptionsChartTypePie,
};

const table: DiagramType = {
  id: DiagramTypeIds.table,
  icon: 'table',
  name: 'Tabell',
};

export class FhiDiagramTypes {
  static bar = bar;
  static barStacked = barStacked;
  static column = column;
  static columnStacked = columnStacked;
  static line = line;
  static map = map;
  static pie = pie;
  static table = table;
}

export const FhiAllDiagramTypes = [bar, barStacked, column, columnStacked, line, map, pie, table];

// This is the order used in diagram-type-navs
export const FhiChartTypes = [line, column, bar, columnStacked, barStacked, pie];

// FhiMapTypes is kept as an array even though it may not get more than one item,
// because the implementation in the diagram type nav is the same for
// both FhiChartTypes and FhiMapTypes
export const FhiMapTypes = [map];

// FhiMapTypeIds represents the different topo.json maps currently supported
export enum FhiMapTypeId {
  mapFylker,
  mapFylker2019,
}
export const FhiMapTypeIds = [
  FhiMapTypeId[FhiMapTypeId.mapFylker],
  FhiMapTypeId[FhiMapTypeId.mapFylker2019],
];
