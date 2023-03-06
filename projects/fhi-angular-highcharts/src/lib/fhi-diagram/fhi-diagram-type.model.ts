import { Options } from 'highcharts';

/**
 * FhiDiagramType = table, map or any of the chart types used in FHI-app's
 */
export interface FhiDiagramType {
  id: string;
  options: Options;
  isMap?: boolean;
  mapFile?: string;
}
