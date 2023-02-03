import { Options } from 'highcharts';

import { OptionsChartTypeBar } from './options/options-chart-type-bar';
import { OptionsChartTypeBarStacked } from './options/options-chart-type-bar-stacked';
import { OptionsChartTypeColumn } from './options/options-chart-type-column';
import { OptionsChartTypeColumnStacked } from './options/options-chart-type-column-stacked';
import { OptionsChartTypeLine } from './options/options-chart-type-line';
import { OptionsMapFylker2019 } from './options/options-map-fylker-2019';
import { OptionsMapFylker } from './options/options-map-fylker';
import { DiagramtypeId } from './fhi-highcharts-diagramtype-id';

/**
 * Diagramtype er et Allvis-domenebegrep
 * - "Diagramtyper": "Alle tilgjengelig visninger av et datasett, inkl. tabell"
 */
export interface Diagramtype {
  id: string;
  urlParamValue: string;
  guiName: string;
  options: Options;
  icon: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isMap?: boolean;
  mapFile?: string;
}

export class Diagramtyper {
  static bar: Diagramtype = {
    id: DiagramtypeId.bar,
    urlParamValue: 'liggendeSoyle',
    guiName: 'Liggende søylediagram',
    options: OptionsChartTypeBar,
    icon: 'liggende-soyle.svg'
  };
  static barStacked: Diagramtype = {
    id: DiagramtypeId.barStacked,
    urlParamValue: 'stabletLiggendeSoyle',
    guiName: 'Stablet liggende søylediagram',
    options: OptionsChartTypeBarStacked,
    icon: 'stablet-liggende-soyle.svg'
  };
  static column: Diagramtype = {
    id: DiagramtypeId.column,
    urlParamValue: 'soyle',
    guiName: 'Søylediagram',
    options: OptionsChartTypeColumn,
    icon: 'soyle.svg'
  };
  static columnStacked: Diagramtype = {
    id: DiagramtypeId.columnStacked,
    urlParamValue: 'stabletSoyle',
    guiName: 'Stablet søylediagram',
    options: OptionsChartTypeColumnStacked,
    icon: 'stablet-soyle.svg'
  };
  static line: Diagramtype = {
    id: DiagramtypeId.line,
    urlParamValue: 'linje',
    guiName: 'Linjediagram',
    options: OptionsChartTypeLine,
    icon: 'linje.svg'
  };
  static mapFylker2019: Diagramtype = {
    id: DiagramtypeId.mapFylker2019,
    urlParamValue: 'kart-2019',
    guiName: 'Fylkeskart (før 2019)',
    options: OptionsMapFylker2019,
    icon: 'kart.svg',
    isMap: true,
    mapFile: 'assets/geo-json/no-all-2019.geo.json'
  };
  static mapFylker: Diagramtype = {
    id: DiagramtypeId.mapFylker,
    urlParamValue: 'kart',
    guiName: 'Fylkeskart',
    options: OptionsMapFylker,
    icon: 'kart.svg',
    isMap: true,
    mapFile: 'assets/geo-json/no-all.geo.json'
  };
  static table: Diagramtype = {
    id: DiagramtypeId.table,
    urlParamValue: 'tabell',
    guiName: 'Tabell',
    options: OptionsChartTypeLine, // to create hidden chart for csv-data
    icon: 'tabell.svg'
  };
};
