import { Diagramtype } from "./fhi-highcharts-diagramtyper";

export interface FhiSerie {
  data:	Array<Data>;
  name:	string;
  colorIndex:	number;
  legendIndex: number;
}

interface Data {
  name: string;
  y: number;
}

export interface FhiHighchartsConfig {
  captionLastUpdated: string;
  captionDisclaimer?: string;
  creditsHref: string;
  creditsText: string;
  diagramtype: Diagramtype;
  title: string;
  series: Array<FhiSerie>;
}
