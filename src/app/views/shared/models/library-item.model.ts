export enum LibraryItemType {
  html = 0,
  ngBootstrap = 1,
  fhiAngular = 2
}

export interface LibraryItem {
  id: string;
  title: string;
  type: number;
  exampleHtml: string;
  codeHtml: string;
  documentationHtml: string;
}
