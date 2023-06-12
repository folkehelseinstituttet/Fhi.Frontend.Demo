import { OptionsChartTypeArea } from '../highcharts-options/options-chart-type-area';
import { OptionsChartTypeBar } from '../highcharts-options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from '../highcharts-options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from '../highcharts-options/options-chart-type-column';
import { OptionsChartTypeColumnStacked } from '../highcharts-options/options-chart-type-column-stacked';
import { OptionsChartTypeDonut } from '../highcharts-options/options-chart-type-donut';
import { OptionsChartTypeLine } from '../highcharts-options/options-chart-type-line';
import { OptionsChartTypePie } from '../highcharts-options/options-chart-type-pie';

import { FhiDiagramType } from './fhi-diagram.models';

export class FhiDiagramTypeId {
  static area = 'area';
  static bar = 'bar';
  static barStacked = 'barStacked';
  static column = 'column';
  static columnStacked = 'columnStacked';
  static donut = 'donut';
  static line = 'line';
  static mapFylker2019 = 'mapFylker2019';
  static mapFylker = 'mapFylker';
  static pie = 'pie';
  static table = 'table';
}

export class FhiDiagramTypeGroups {
  static chart = 'chart';
  static map = 'map';
  static table = 'table'
};

const area: FhiDiagramType = {
  id: FhiDiagramTypeId.area,
  icon: undefined,
  name: '',
  options: OptionsChartTypeArea
}

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

const donut: FhiDiagramType = {
  id: FhiDiagramTypeId.donut,
  icon: undefined,
  name: '',
  options: OptionsChartTypeDonut
}

const line: FhiDiagramType = {
  id: FhiDiagramTypeId.line,
  icon: 'graph-up',
  name: 'Linjediagram',
  options: OptionsChartTypeLine
}

const mapFylker2019: FhiDiagramType = {
  id: FhiDiagramTypeId.mapFylker2019,
  icon: 'geo-alt',
  name: 'Fylkeskart før 2019',
  options: {
    chart: {
      map: FhiDiagramTypeId.mapFylker2019
    }
  },
  isMap: true,
  mapFile: 'assets/geo-json/no-all-2019.geo.json'
}

const mapFylker: FhiDiagramType = {
  id: FhiDiagramTypeId.mapFylker,
  icon: 'geo-alt',
  name: 'Fylkeskart',
  options: {
    chart: {
      map: FhiDiagramTypeId.mapFylker
    }
  },
  isMap: true,
  mapFile: 'assets/geo-json/no-all.geo.json'
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
  static mapFylker2019 = mapFylker2019;
  static mapFylker = mapFylker;
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
  mapFylker2019,
  mapFylker,
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
  pie
];

export const FhiMapTypes = [
  mapFylker2019,
  mapFylker
];
