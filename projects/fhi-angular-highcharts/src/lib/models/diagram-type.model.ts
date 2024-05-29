import { Options } from 'highcharts';

export interface DiagramType {
  active?: boolean;
  disabled?: boolean;
  id: string;
  icon?: string;
  name: string;
  options?: Options;
}
