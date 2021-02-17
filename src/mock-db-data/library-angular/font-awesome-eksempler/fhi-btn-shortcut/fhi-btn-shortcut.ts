import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { FhiBtnShortcutDocumentation } from './fhi-btn-shortcut-dockumentation';

export const FhiBtnShortcut: LibraryExample[] = [{
  title: 'Snarveiknapp',

  exampleMarkdown: `
<fhi-btn-shortcut [link]="'./'" [text]="'Snarvei til ...'"></fhi-btn-shortcut>
`,

  documentationMarkdown: FhiBtnShortcutDocumentation
}];
