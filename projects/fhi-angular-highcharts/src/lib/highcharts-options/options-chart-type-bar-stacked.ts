import { OptionsStackingValue } from 'highcharts';

const stackingValue: OptionsStackingValue = 'normal';

export const OptionsChartTypeBarStacked = {
  chart: {
    type: 'bar'
  },
  plotOptions: {
    series: {
      stacking: stackingValue
    }
  }
};
