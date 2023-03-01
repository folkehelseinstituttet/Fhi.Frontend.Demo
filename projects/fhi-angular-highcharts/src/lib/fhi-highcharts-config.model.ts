import { DiagramType } from "./fhi-diagram-types/fhi-diagram-type.model";

//  TODO: remove
export interface FhiHighchartsConfig {
  captionLastUpdated: string;
  captionDisclaimer?: string;
  creditsHref: string;
  creditsText: string;
  diagramtype: DiagramType;
  title: string;
  series: Array<FhiSerie>;
}




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

export interface DiagramOptions {
  creditsHref: string;
  creditsText: string;
  data: Array<FhiSerie>;
  diagramType: DiagramType | undefined;
  disclaimer?: string;
  lastUpdated: string;
  title: string;
}
