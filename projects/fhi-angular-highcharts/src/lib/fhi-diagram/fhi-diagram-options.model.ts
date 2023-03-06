import { FhiDiagramType } from "./fhi-diagram-type.model";

interface Data {
  name: string;
  y: number;
}

export interface FhiDiagramSerie {
  data:	Array<Data>;
  name:	string;
  colorIndex:	number;
  legendIndex: number;
}

export interface FhiDiagramOptions {
  creditsHref?: string;
  creditsText?: string;
  data: Array<FhiDiagramSerie>;
  diagramType?: FhiDiagramType | undefined;
  disclaimer?: string;
  lastUpdated?: string;
  openSource?: boolean;
  title: string;
}
