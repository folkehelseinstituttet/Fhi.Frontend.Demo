import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { FhiBtnShortcutDocumentation } from './fhi-btn-shortcut-documentation';

export const FhiBtnShortcut: LibraryExample[] = [{
  title: 'Snarveiknapp',

  codeMarkdown: `
<fhi-btn-shortcut [link]="'./'" [text]="'Snarvei til ...'"></fhi-btn-shortcut>
`,

  documentationHtml: FhiBtnShortcutDocumentation
}];
