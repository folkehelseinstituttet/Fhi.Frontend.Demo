import { OptionsChartTypeArea } from '../highcharts-options/options-chart-type-area';
import { OptionsChartTypeBar } from '../highcharts-options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from '../highcharts-options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from '../highcharts-options/options-chart-type-column';
import { OptionsChartTypeColumnStacked } from '../highcharts-options/options-chart-type-column-stacked';
import { OptionsChartTypeDonut } from '../highcharts-options/options-chart-type-donut';
import { OptionsChartTypeLine } from '../highcharts-options/options-chart-type-line';
import { OptionsMapFylker2019 } from '../highcharts-options/options-map-fylker-2019';
import { OptionsMapFylker } from '../highcharts-options/options-map-fylker';
import { OptionsChartTypePie } from '../highcharts-options/options-chart-type-pie';

import { DiagramType } from './fhi-diagram-type.model';
import { DiagramTypeId } from './fhi-diagram-type-id';

const area: DiagramType = {
  id: DiagramTypeId.area,
  options: OptionsChartTypeArea
}
const bar: DiagramType = {
  id: DiagramTypeId.bar,
  options: OptionsChartTypeBar
}
const barStacked: DiagramType = {
  id: DiagramTypeId.barStacked,
  options: OptionsChartTypeBarStacked
}
const column: DiagramType = {
  id: DiagramTypeId.column,
  options: OptionsChartTypeColumn
}
const columnStacked: DiagramType = {
  id: DiagramTypeId.columnStacked,
  options: OptionsChartTypeColumnStacked
}
const donut: DiagramType = {
  id: DiagramTypeId.donut,
  options: OptionsChartTypeDonut
}
const line: DiagramType = {
  id: DiagramTypeId.line,
  options: OptionsChartTypeLine
}
const mapFylker2019: DiagramType = {
  id: DiagramTypeId.mapFylker2019,
  options: OptionsMapFylker2019,
  isMap: true,
  mapFile: 'assets/geo-json/no-all-2019.geo.json'
}
const mapFylker: DiagramType = {
  id: DiagramTypeId.mapFylker,
  options: OptionsMapFylker,
  isMap: true,
  mapFile: 'assets/geo-json/no-all.geo.json'
}
const pie: DiagramType = {
  id: DiagramTypeId.pie,
  options: OptionsChartTypePie
}
// TODO: remove all leftovers from deprecated "csv-data"-hack
const table: DiagramType = {
  id: DiagramTypeId.table,
  options: OptionsChartTypeLine // to create hidden chart for csv-data
}

export class DiagramTypes {
  static area = area;
  static bar = bar;
  static barStacked = barStacked;
  static column = column;
  static columnStacked = columnStacked;
  static donut = donut;
  static line = line;
  static mapFylker2019 = mapFylker2019;
  static mapFylker = mapFylker;
  static pie = pie;
  static table = table;
}

export const DiagramTypeList = [
  area,
  bar,
  barStacked,
  column,
  columnStacked,
  donut,
  line,
  mapFylker2019,
  mapFylker,
  pie,
  table
];
