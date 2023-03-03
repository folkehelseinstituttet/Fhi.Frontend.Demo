import { Options } from 'highcharts';

/**
 * DiagramType = table, map or any of the chart types used in FHI-app's
 */
export interface DiagramType {
  id: string;
  options: Options;
  isMap?: boolean;
  mapFile?: string;
}
