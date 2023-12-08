import { Options } from 'highcharts';

export interface FhiDiagramType {
  id: string;
  icon: string;
  name: string;
  group?: string;
  options?: Options;
}
