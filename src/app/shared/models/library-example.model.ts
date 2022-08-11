export interface LibraryExample {
  title: string;
  type?: number;
  exampleHtml?: string;
  documentationHtml?: string;
  codeMarkdown?: string; // hvis en vil ha en annen markdown-html enn markup som brukes for å lage visningseksempelet
  id?: string; // autogenereres
  category?: string; // kun komponenter
}
