export enum MockData {
  OneSerieFylke = 1,
  TwoSeriesAar = 2,
  MultipleSeriesAar = 3
}

export const MockDataSets = [{
  index: MockData.OneSerieFylke,
  label: 'Dødsfall etter årsak fordelt på fylke, 2016 - 2020'
}, {
  index: MockData.TwoSeriesAar,
  label: 'Dødsfall etter årsak, 2008 - 2018'
}, {
  index: MockData.MultipleSeriesAar,
  label: 'Dødsfall etter årsak, 2017 - 2021'
}];
