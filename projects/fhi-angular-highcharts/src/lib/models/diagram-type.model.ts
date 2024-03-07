import { Options } from 'highcharts';

export interface DiagramType {
  disabled?: boolean;
  id: string;
  icon: string;
  name: string;
  options?: Options;
}
