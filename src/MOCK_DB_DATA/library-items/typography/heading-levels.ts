import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const HeadingLevels: LibraryItem[] = [{
  id: LibraryItemIds.HeadingLevels,
  title: 'Heading levels',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<h1>Overskriftsnivå 1</h1>
<h2>Overskriftsnivå 2</h1>
<h3>Overskriftsnivå 3</h1>
<h4>Overskriftsnivå 4</h1>
<h5>Overskriftsnivå 5</h1>`;
}

function getCodeHtml(): string | null {
  return ``;
}

function getDocumentationHtml(): string | null {
  return null;
}

