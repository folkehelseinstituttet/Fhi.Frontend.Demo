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

export interface DiagramOptions {
  creditsHref: string;
  creditsText: string;
  data: Array<FhiSerie>;
  diagramType: DiagramType | undefined;
  disclaimer?: string;
  lastUpdated: string;
  title: string;
}
