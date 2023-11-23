import { AlignValue, OptionsLayoutValue, VerticalAlignValue } from 'highcharts';

const alignValueCenter: AlignValue = 'center';
const alignValueLeft: AlignValue = 'left';

const layoutValueVertical: OptionsLayoutValue = 'vertical';
const verticalAlignValueTop: VerticalAlignValue = 'top';

export const OptionsChartTypePie = {
  chart: {
    type: 'pie',
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
      size: '80%',
      innerSize: '0%',
    },
  },
  legend: {
    align: alignValueLeft,
    maxHeight: 350,
    itemMarginBottom: 3,
    itemMarginTop: 3,
    layout: layoutValueVertical,
    title: {
      text: undefined,
    },
    verticalAlign: verticalAlignValueTop,
  },
  responsive: {
    rules: [
      {
        chartOptions: {
          legend: {
            align: alignValueCenter,
            margin: 0,
            maxHeight: 120,
          },
        },
        condition: {
          maxWidth: 400,
        },
      },
    ],
  },
};
