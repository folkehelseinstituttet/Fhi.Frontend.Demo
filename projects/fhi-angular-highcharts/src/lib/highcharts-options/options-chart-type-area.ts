import { OptionsTickmarkPlacementValue } from 'highcharts';
const tickmarkPlacement: OptionsTickmarkPlacementValue = 'on';

export const OptionsChartTypeArea = {
  chart: {
    type: 'area',
  },
  plotOptions: {
    area: {
      marker: {
        symbol: 'circle',
        radius: 2.5,
      },
    },
  },
  xAxis: {
    tickLength: 7,
    tickmarkPlacement: tickmarkPlacement,
    tickWidth: 1,
  },
};
