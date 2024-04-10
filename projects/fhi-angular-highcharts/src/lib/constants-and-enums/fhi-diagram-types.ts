import { OptionsChartTypeBar } from '../highcharts-options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from '../highcharts-options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from '../highcharts-options/options-chart-type-column';
import { OptionsChartTypeColumnStacked } from '../highcharts-options/options-chart-type-column-stacked';
import { OptionsChartTypeLine } from '../highcharts-options/options-chart-type-line';
import { OptionsChartTypePie } from '../highcharts-options/options-chart-type-pie';

import { DiagramType } from '../models/diagram-type.model';
import { DiagramTypeIdValues } from './diagram-type-ids';

export enum DiagramTypeGroupIndex {
  tableIndex = 0,
  mapIndex = 1,
  chartIndex = 2,
}

const bar: DiagramType = {
  id: DiagramTypeIdValues.bar,
  icon: 'bar-chart-line-horizontal',
  groupIndex: DiagramTypeGroupIndex.chartIndex,
  name: 'Liggende søylediagram',
  options: OptionsChartTypeBar,
};

const barStacked: DiagramType = {
  id: DiagramTypeIdValues.barStacked,
  icon: 'bar-chart-line-stacked-horizontal',
  groupIndex: DiagramTypeGroupIndex.chartIndex,
  name: 'Stablet liggende søylediagram',
  options: OptionsChartTypeBarStacked,
};

const column: DiagramType = {
  id: DiagramTypeIdValues.column,
  icon: 'bar-chart-line',
  groupIndex: DiagramTypeGroupIndex.chartIndex,
  name: 'Søylediagram',
  options: OptionsChartTypeColumn,
};

const columnStacked: DiagramType = {
  id: DiagramTypeIdValues.columnStacked,
  icon: 'bar-chart-line-stacked',
  groupIndex: DiagramTypeGroupIndex.chartIndex,
  name: 'Stablet søylediagram',
  options: OptionsChartTypeColumnStacked,
};

const line: DiagramType = {
  id: DiagramTypeIdValues.line,
  icon: 'graph-up',
  groupIndex: DiagramTypeGroupIndex.chartIndex,
  name: 'Linjediagram',
  options: OptionsChartTypeLine,
};

const map: DiagramType = {
  id: DiagramTypeIdValues.map,
  icon: 'geo-alt',
  groupIndex: DiagramTypeGroupIndex.mapIndex,
  name: 'Kart',
  options: {
    chart: {
      map: undefined,
    },
  },
};

const pie: DiagramType = {
  id: DiagramTypeIdValues.pie,
  icon: 'pie-chart',
  groupIndex: DiagramTypeGroupIndex.chartIndex,
  name: 'Kakediagram',
  options: OptionsChartTypePie,
};

const table: DiagramType = {
  id: DiagramTypeIdValues.table,
  icon: 'table',
  groupIndex: DiagramTypeGroupIndex.tableIndex,
  name: 'Tabell',
};

export class DiagramTypes {
  static bar = bar;
  static barStacked = barStacked;
  static column = column;
  static columnStacked = columnStacked;
  static line = line;
  static map = map;
  static pie = pie;
  static table = table;
}

export const AllDiagramTypes = [bar, barStacked, column, columnStacked, line, map, pie, table];

// This is the order used in diagram-type-navs
export const ChartTypes = [line, column, bar, columnStacked, barStacked, pie];

// MapTypes is kept as an array even though it may not get more than one item,
// because the implementation in the diagram type nav is the same for
// both ChartTypes and MapTypes
export const MapTypes = [map];
