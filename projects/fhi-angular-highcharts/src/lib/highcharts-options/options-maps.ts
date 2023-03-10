import { AlignValue, OptionsLayoutValue, VerticalAlignValue } from 'highcharts';

const legendAlignValue: AlignValue = 'center';
const legendVerticalAlignValue: VerticalAlignValue = 'bottom';
const legendOptionsLayoutValue: OptionsLayoutValue = 'horizontal';
const buttonOptionsVerticalAlignValue: VerticalAlignValue = 'top';

export const OptionsMaps = {
  chart: {
    marginTop: 50
  },
  credits: {
    mapText: '. <a href="{geojson.copyrightUrl}">Kartdata fra \u00a9 {geojson.copyrightShort}</a>',
    mapTextFull: undefined,
  },
  legend: {
    align: legendAlignValue,
    borderWidth: 0,
    layout: legendOptionsLayoutValue,
    verticalAlign: legendVerticalAlignValue
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: buttonOptionsVerticalAlignValue,
    }
  },
  colorAxis: {
    maxColor: '#32345C',
    minColor: '#95e8ff'
  }
};
