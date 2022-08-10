import { LibraryExample } from 'src/app/shared/models/library-example.model';

export const HelloWorldLibraryComponent: LibraryExample[] = [{
  title: 'Hello World!',
  exampleHtml: `Html blir skrevet over for angular komponenter 'default-example.component.ts'`,
  exampleTypeScript: "TypeScript blir skrevet over for angular komponenter i 'default-example.component.ts'",
  codeMarkdown: `<app-hello-world [title]="'Hello World!'"></app-hello-world>`,
  angularComponentClassName: "HelloWorldComponent",
  componentFolder: "hello-world"
}];
