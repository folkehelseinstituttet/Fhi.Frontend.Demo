import { AlignValue, OptionsLayoutValue, VerticalAlignValue } from 'highcharts';

const legendAlignValue: AlignValue = 'center';
const legendVerticalAlignValue: VerticalAlignValue = 'bottom';
const legendOptionsLayoutValue: OptionsLayoutValue = 'horizontal';
const buttonOptionsVerticalAlignValue: VerticalAlignValue = 'top';

export const OptionsMaps = {
  chart: {
    marginTop: 50,
  },
  credits: {
    mapText: '. <a href="{geojson.copyrightUrl}">Kartdata fra \u00a9 {geojson.copyrightShort}</a>',
    mapTextFull: undefined,
  },
  legend: {
    align: legendAlignValue,
    borderWidth: 0,
    layout: legendOptionsLayoutValue,
    verticalAlign: legendVerticalAlignValue,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: buttonOptionsVerticalAlignValue,
    },
  },
  colorAxis: {
    stopsPositive: [
      [0, '#ffffff'],
      [0.17, '#c8e1ec'], // B290
      [0.33, '#8fc5dc'], // B280
      [0.5, '#65a9c5'], // B270
      [0.67, '#4089a7'], // B260
      [0.83, '#2a6a82'], // B250
      [1, '#234e5f'], // B240
    ],
    stopsNegative: [
      [0, '#7b2623'], // R140
      [0.17, '#a93c38'], // R150
      [0.33, '#d74b46'], // R160
      [0.5, '#ec7c73'], // R170
      [0.67, '#fda49b'], // R180
      [0.83, '#ffd2cc'], // R190
      [1, '#ffffff'],
    ],
    stopsNegativeAndPositive: [
      [0, '#7b2623'], // R140
      [0.08, '#a93c38'], // R150
      [0.17, '#d74b46'], // R160
      [0.25, '#ec7c73'], // R170
      [0.33, '#fda49b'], // R180
      [0.42, '#ffd2cc'], // R190
      [0.5, '#ffffff'],
      [0.58, '#c8e1ec'], // B290
      [0.67, '#8fc5dc'], // B280
      [0.75, '#65a9c5'], // B270
      [0.83, '#4089a7'], // B260
      [0.92, '#2a6a82'], // B250
      [1, '#234e5f'], // B240
    ],
  },
};
