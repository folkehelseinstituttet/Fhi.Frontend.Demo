import { Options } from 'highcharts';

export interface DiagramType {
  id: string;
  icon: string;
  name: string;
  group?: string;
  options?: Options;
}
