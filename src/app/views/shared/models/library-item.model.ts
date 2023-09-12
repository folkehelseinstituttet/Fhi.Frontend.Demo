export enum LibraryItemType {
  html = 0,
  angular = 1,

  // TODO: deprecated
  ngBootstrap = 2,
  fhiAngular = 3
}

// Items

export interface LibraryItemBase {
  id: string; // TODO: method that checks for identical id's
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
  id: string; // TODO: method that checks for identical id's
  title: string;
}

export interface LibraryGroupExtended extends LibraryGroupBase {
  apiEndPoint: string; // TODO: method that checks that all LibraryItemGroupsShared[foo].apiEndPoint === foo
  parentUrlSegment: string;
}

export interface LibraryItemGroupsShared {
  [key: string]: LibraryGroupExtended;
}

export interface LibraryItemGroup extends LibraryGroupBase {
  intro: string;
  libraryItems: Array<LibraryItem>;
}
