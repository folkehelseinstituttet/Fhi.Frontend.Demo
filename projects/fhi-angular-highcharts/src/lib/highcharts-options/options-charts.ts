export const OptionsCharts = {
  chart: {
    colorCount: 9,
  },
  legend: {
    align: 'left',
    verticalAlign: 'top',
    margin: 25,
    maxHeight: 150,
    symbolPadding: 10,
    symbolWidth: 1,

    // TODO: didn't find any other place to add suffix to label...
    // labelFormatter: function () {
    //   if (this.name.includes('Andel')) {
    //     return this.name + ' (%)';
    //   } else {
    //     return this.name;
    //   }
    // },
  },
  xAxis: {
    allowDecimals: false,
    type: 'category',
  },
  yAxis: {
    allowDecimals: false,
    title: {
      text: null,
    },
    min: 0,
  },
};
