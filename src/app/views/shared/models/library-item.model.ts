export enum LibraryItemDependencyType {
  css = 0,
  ngBootstrap = 1,
  fhiAngular = 2,
}

export enum LibraryItemType {
  angular = 0,
  html = 1,

  // TODO: remove
  css = 2,
  ngBootstrap = 3,
  fhiAngular = 4,
}

// Items

export interface LibraryItemBase {
  id: string; // TODO: method that checks for identical id's
  title: string;
  titleLang?: string;
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
  parent?: LibraryGroupExtended;
  dependencyType?: number;
}

// Groups

export interface LibraryGroupBase {
  id: string; // TODO: method that checks for identical id's
  title: string;
  titleLang?: string;
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
