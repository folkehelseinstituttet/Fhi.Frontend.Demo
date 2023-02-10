import { DiagramType } from "./fhi-diagram-types/fhi-diagram-type.model";

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
  diagramtype: DiagramType;
  title: string;
  series: Array<FhiSerie>;
}
