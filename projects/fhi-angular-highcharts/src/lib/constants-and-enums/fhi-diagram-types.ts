import { OptionsChartTypeBar } from '../highcharts-options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from '../highcharts-options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from '../highcharts-options/options-chart-type-column';
import { OptionsChartTypeColumnAndLine } from '../highcharts-options/options-chart-type-column-and-line';
import { OptionsChartTypeColumnStacked } from '../highcharts-options/options-chart-type-column-stacked';
import { OptionsChartTypeLine } from '../highcharts-options/options-chart-type-line';
import { OptionsChartTypePie } from '../highcharts-options/options-chart-type-pie';

import { DiagramType } from '../models/diagram-type.model';
import { DiagramTypeIdValues } from './diagram-type-ids';

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

const columnAndLine: DiagramType = {
  id: DiagramTypeIdValues.columnAndLine,
  name: 'Dobbel akse, linje og søyle',
  options: OptionsChartTypeColumnAndLine,
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
  options: {
    chart: {
      map: undefined,
    },
  },
};

const mapFylker: DiagramType = {
  id: DiagramTypeIdValues.mapFylker,
  name: 'Kart (fylker)',
  ...mapShared,
};

const mapFylker2019: DiagramType = {
  id: DiagramTypeIdValues.mapFylker2019,
  name: 'Kart (fylker 2019)',
  ...mapShared,
};

const mapFylker2023: DiagramType = {
  id: DiagramTypeIdValues.mapFylker2023,
  name: 'Kart (fylker 2023)',
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
  static columnAndLine = columnAndLine;
  static columnStacked = columnStacked;
  static line = line;
  static mapFylker = mapFylker;
  static mapFylker2019 = mapFylker2019;
  static mapFylker2023 = mapFylker2023;
  static pie = pie;
  static table = table;
}

export const AllDiagramTypes = [
  bar,
  barStacked,
  column,
  columnAndLine,
  columnStacked,
  line,
  mapFylker,
  mapFylker2019,
  mapFylker2023,
  pie,
  table,
];

export const ChartTypes = [line, column, bar, columnStacked, barStacked, pie, columnAndLine];
export const MapTypes = [mapFylker, mapFylker2019, mapFylker2023];

// For the public API Surface
export class FhiDiagramTypes {
  static bar = {
    id: bar.id,
    name: bar.name,
  };
  static barStacked = {
    id: barStacked.id,
    name: barStacked.name,
  };
  static column = {
    id: column.id,
    name: column.name,
  };
  static columnAndLine = {
    id: columnAndLine.id,
    name: columnAndLine.name,
  };
  static columnStacked = {
    id: columnStacked.id,
    name: columnStacked.name,
  };
  static line = {
    id: line.id,
    name: line.name,
  };
  static mapFylker = {
    id: mapFylker.id,
    name: mapFylker.name,
  };
  static mapFylker2019 = {
    id: mapFylker2019.id,
    name: mapFylker2019.name,
  };
  static mapFylker2023 = {
    id: mapFylker2023.id,
    name: mapFylker2023.name,
  };
  static pie = {
    id: pie.id,
    name: pie.name,
  };
  static table = {
    id: table.id,
    name: table.name,
  };
}
