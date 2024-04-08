import { Options } from 'highcharts';

export interface DiagramType {
  active?: boolean;
  disabled?: boolean;
  id: string;
  icon: string;
  groupIndex: number;
  name: string;
  options?: Options;
}
