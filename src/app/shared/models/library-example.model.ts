export interface LibraryExample {
  title: string;
  exampleHtml?: string;
  exampleMarkdown?: string; // hvis en vil ha en annen markdown-html enn markup som brukes for å lage visningseksempelet
  documentationMarkdown?: string;
  id?: string; // autogenereres
  category?: string; // kun komponenter
}
