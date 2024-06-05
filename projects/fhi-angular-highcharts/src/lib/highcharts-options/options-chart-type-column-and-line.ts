// import { OptionsTickmarkPlacementValue } from 'highcharts';
// const tickmarkPlacement: OptionsTickmarkPlacementValue = 'on';

export const OptionsChartTypeColumnAndLine = {
  chart: {},
  plotOptions: {
    column: {
      dataLabels: {
        enabled: false,
      },
    },
    line: {
      marker: {
        symbol: 'circle',
        radius: 2.5,
      },
    },
  },
  // xAxis: {
  //   tickLength: 7,
  //   tickmarkPlacement: tickmarkPlacement,
  //   tickWidth: 1,
  // },
};
