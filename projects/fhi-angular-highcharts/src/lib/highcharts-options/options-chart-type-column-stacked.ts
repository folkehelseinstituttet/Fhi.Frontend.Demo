import { OptionsStackingValue } from 'highcharts';
const stackingValue: OptionsStackingValue = 'normal';

export const OptionsChartTypeColumnStacked = {
  chart: {
    type: 'column',
  },
  plotOptions: {
    series: {
      stacking: stackingValue,
    },
  },
};
