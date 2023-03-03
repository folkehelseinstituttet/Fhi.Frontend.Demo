import { DiagramType } from "./fhi-diagram-types/fhi-diagram-type.model";

interface Data {
  name: string;
  y: number;
}

export interface DiagramSerie {
  data:	Array<Data>;
  name:	string;
  colorIndex:	number;
  legendIndex: number;
}

export interface DiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  data: Array<DiagramSerie>;
  diagramType?: DiagramType | undefined;
  disclaimer?: string;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}
