import { Type } from '@angular/core';

export interface LibraryExample {
  title: string;
  exampleHtml?: string;
  documentationMarkdown?: string;
  codeMarkdown?: string; // hvis en vil ha en annen markdown-html enn markup som brukes for å lage visningseksempelet
  id?: string; // autogenereres
  category?: string; // kun komponenter

  exampleTypeScript?: string;
  angularComponentClassName?: string; // klassenavn for angular component
  componentFolder?: string;
  angularComponentType?: Type<any>; // settes spesifikt i "LibraryExampleDetailComponent"
}
