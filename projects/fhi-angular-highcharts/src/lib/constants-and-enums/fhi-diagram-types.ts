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

// Charts

const bar: DiagramType = {
  id: DiagramTypeIdValues.bar,
  icon: 'bar-chart-line-horizontal',
  name: 'Liggende søylediagram',
  options: OptionsChartTypeBar,
};

const barStacked: DiagramType = {
  id: DiagramTypeIdValues.barStacked,
  icon: 'bar-chart-line-stacked-horizontal',
  name: 'Stablet liggende søylediagram',
  options: OptionsChartTypeBarStacked,
};

const column: DiagramType = {
  id: DiagramTypeIdValues.column,
  icon: 'bar-chart-line',
  name: 'Søylediagram',
  options: OptionsChartTypeColumn,
};

const columnStacked: DiagramType = {
  id: DiagramTypeIdValues.columnStacked,
  icon: 'bar-chart-line-stacked',
  name: 'Stablet søylediagram',
  options: OptionsChartTypeColumnStacked,
};

const line: DiagramType = {
  id: DiagramTypeIdValues.line,
  icon: 'graph-up',
  name: 'Linjediagram',
  options: OptionsChartTypeLine,
};

const pie: DiagramType = {
  id: DiagramTypeIdValues.pie,
  icon: 'pie-chart',
  name: 'Kakediagram',
  options: OptionsChartTypePie,
};

// Maps

const mapShared = {
  icon: 'geo-alt',
  name: 'Kart',
  options: {
    chart: {
      map: undefined,
    },
  },
};

const map: DiagramType = {
  id: DiagramTypeIdValues.map,
  ...mapShared,
};

const mapFylker: DiagramType = {
  id: DiagramTypeIdValues.mapFylker,
  ...mapShared,
};

const mapFylker2019: DiagramType = {
  id: DiagramTypeIdValues.mapFylker2019,
  ...mapShared,
};

// Table

const table: DiagramType = {
  id: DiagramTypeIdValues.table,
  icon: 'table',
  name: 'Tabell',
};

// All diagram types

export class DiagramTypes {
  static bar = bar;
  static barStacked = barStacked;
  static column = column;
  static columnStacked = columnStacked;
  static line = line;
  static map = map;
  static mapFylker = mapFylker;
  static mapFylker2019 = mapFylker2019;
  static pie = pie;
  static table = table;
}

export const AllDiagramTypes = [
  bar,
  barStacked,
  column,
  columnStacked,
  line,
  map,
  mapFylker,
  mapFylker2019,
  pie,
  table,
];

// This is the order used in diagram-type-navs
export const ChartTypes = [line, column, bar, columnStacked, barStacked, pie];
export const MapTypes = [map, mapFylker, mapFylker2019];
