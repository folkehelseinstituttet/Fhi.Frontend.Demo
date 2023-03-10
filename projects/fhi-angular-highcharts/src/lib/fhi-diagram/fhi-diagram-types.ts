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

import { FhiDiagramType } from './fhi-diagram-type.model';
import { FhiDiagramTypeId } from './fhi-diagram-type-id';

const area: FhiDiagramType = {
  id: FhiDiagramTypeId.area,
  options: OptionsChartTypeArea
}
const bar: FhiDiagramType = {
  id: FhiDiagramTypeId.bar,
  options: OptionsChartTypeBar
}
const barStacked: FhiDiagramType = {
  id: FhiDiagramTypeId.barStacked,
  options: OptionsChartTypeBarStacked
}
const column: FhiDiagramType = {
  id: FhiDiagramTypeId.column,
  options: OptionsChartTypeColumn
}
const columnStacked: FhiDiagramType = {
  id: FhiDiagramTypeId.columnStacked,
  options: OptionsChartTypeColumnStacked
}
const donut: FhiDiagramType = {
  id: FhiDiagramTypeId.donut,
  options: OptionsChartTypeDonut
}
const line: FhiDiagramType = {
  id: FhiDiagramTypeId.line,
  options: OptionsChartTypeLine
}
const mapFylker2019: FhiDiagramType = {
  id: FhiDiagramTypeId.mapFylker2019,
  options: OptionsMapFylker2019,
  isMap: true,
  mapFile: 'assets/geo-json/no-all-2019.geo.json'
}
const mapFylker: FhiDiagramType = {
  id: FhiDiagramTypeId.mapFylker,
  options: OptionsMapFylker,
  isMap: true,
  mapFile: 'assets/geo-json/no-all.geo.json'
}
const pie: FhiDiagramType = {
  id: FhiDiagramTypeId.pie,
  options: OptionsChartTypePie
}
// TODO: remove all leftovers from deprecated "csv-data"-hack
const table: FhiDiagramType = {
  id: FhiDiagramTypeId.table,
  options: OptionsChartTypeLine // to create hidden chart for csv-data
}

export class FhiDiagramTypes {
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

export const FhiDiagramTypeList = [
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
