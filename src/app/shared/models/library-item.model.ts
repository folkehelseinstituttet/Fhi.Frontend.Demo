export enum LibraryItemType {
  html = 0,
  ngBootstrap = 1,
  fhiAngular = 2
}

export interface LibraryItem {
  title: string;
  type?: number;
  exampleHtml?: string;
  documentationHtml?: string;
  codeHtml?: string; // hvis en vil ha en annen markdown-html enn markup som brukes for å lage visningseksempelet
  id?: string; // autogenereres
  category?: string; // kun komponenter
}
