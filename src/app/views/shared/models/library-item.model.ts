export enum LibraryItemType {
  html = 0,
  ngBootstrap = 1,
  fhiAngular = 2
}

// Items

export interface LibraryItemBase {
  id: string;
  title: string;
}

export interface LibraryItemsShared {
  [key: string]: LibraryItemBase;
}

export interface LibraryItem extends LibraryItemBase {
  type: number;
  exampleHtml: string;
  codeHtml: string | null;
  documentationHtml: string | null;
  fullScreenEnabled?: boolean;
}

// Groups

export interface LibraryGroupBase {
  id: string;
  title: string;
}

export interface LibraryGroupBaseAndApi extends LibraryGroupBase {
  apiEndPoint: string;
}

export interface LibraryItemGroupsShared {
  [key: string]: LibraryGroupBaseAndApi;
}

export interface LibraryItemGroup extends LibraryGroupBase {
  intro: string;
  libraryItems: Array<LibraryItem>;
}
