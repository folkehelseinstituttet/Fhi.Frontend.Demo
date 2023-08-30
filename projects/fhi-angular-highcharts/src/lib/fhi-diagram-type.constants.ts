import { OptionsMaps } from './highcharts-options/options-maps';
import { OptionsChartTypeArea } from './highcharts-options/options-chart-type-area';
import { OptionsChartTypeBar } from './highcharts-options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from './highcharts-options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from './highcharts-options/options-chart-type-column';
import { OptionsChartTypeColumnStacked } from './highcharts-options/options-chart-type-column-stacked';
import { OptionsChartTypeDonut } from './highcharts-options/options-chart-type-donut';
import { OptionsChartTypeLine } from './highcharts-options/options-chart-type-line';
import { OptionsChartTypePie } from './highcharts-options/options-chart-type-pie';

import { FhiDiagramType } from './fhi-diagram.models';

export class FhiDiagramTypeId {
  // static area = 'area';
  static bar = 'bar';
  static barStacked = 'barStacked';
  static column = 'column';
  static columnStacked = 'columnStacked';
  // static donut = 'donut';
  static line = 'line';
  static map = 'map';
  static pie = 'pie';
  static table = 'table';
}

export class FhiDiagramTypeGroups {
  static chart = 'chart';
  static map = 'map';
  static table = 'table'
};

// const area: FhiDiagramType = {
//   id: FhiDiagramTypeId.area,
//   icon: 'table',
//   name: '',
//   options: OptionsChartTypeArea
// }

const bar: FhiDiagramType = {
  id: FhiDiagramTypeId.bar,
  icon: 'bar-chart-line-horizontal',
  name: 'Liggende søylediagram',
  options: OptionsChartTypeBar
}

const barStacked: FhiDiagramType = {
  id: FhiDiagramTypeId.barStacked,
  icon: 'bar-chart-line-stacked-horizontal',
  name: 'Stablet liggende søylediagram',
  options: OptionsChartTypeBarStacked
}

const column: FhiDiagramType = {
  id: FhiDiagramTypeId.column,
  icon: 'bar-chart-line',
  name: 'Søylediagram',
  options: OptionsChartTypeColumn
}

const columnStacked: FhiDiagramType = {
  id: FhiDiagramTypeId.columnStacked,
  icon: 'bar-chart-line-stacked',
  name: 'Stablet søylediagram',
  options: OptionsChartTypeColumnStacked
}

// const donut: FhiDiagramType = {
//   id: FhiDiagramTypeId.donut,
//   icon: 'donut-chart',
//   name: 'Smultringdiagram',
//   options: OptionsChartTypeDonut
// }

const line: FhiDiagramType = {
  id: FhiDiagramTypeId.line,
  icon: 'graph-up',
  name: 'Linjediagram',
  options: OptionsChartTypeLine
}

const map: FhiDiagramType = {
  id: FhiDiagramTypeId.map,
  icon: 'geo-alt',
  name: 'Kart',
  options: {
    chart: {
      map: undefined
    }
  }
}

const pie: FhiDiagramType = {
  id: FhiDiagramTypeId.pie,
  icon: 'pie-chart',
  name: 'Kakediagram',
  options: OptionsChartTypePie
}

const table: FhiDiagramType = {
  id: FhiDiagramTypeId.table,
  icon: 'table',
  name: 'Tabell'
}

export class FhiDiagramTypes {
  // static area = area;
  static bar = bar;
  static barStacked = barStacked;
  static column = column;
  static columnStacked = columnStacked;
  // static donut = donut;
  static line = line;
  static map = map;
  static pie = pie;
  static table = table;
}

export const FhiAllDiagramTypes = [
  // area,
  bar,
  barStacked,
  column,
  columnStacked,
  // donut,
  line,
  map,
  pie,
  table
];

// This is the order used in diagram-type-navs
export const FhiChartTypes = [
  line,
  column,
  bar,
  columnStacked,
  barStacked,
  pie,
  // donut
];

// This is kept as an array even though it may not get more than one item,
// because the implementation in the diagram type nav is the same for
// both FhiChartTypes and FhiMapTypes
export const FhiMapTypes = [
  map
];

// FhiMapTypeIds represents the different geo-json maps currently supported
export const FhiMapTypeIds = [
  'mapFylker2019',
  'mapFylker'
];

