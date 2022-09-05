import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const HeadingLevels: LibraryItem[] = [{
  id: 'headinglevels',
  title: 'Heading levels',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<h1>Heading level 1</h1>
<h2>Heading level 2</h1>
<h3>Heading level 3</h1>
<h4>Heading level 4</h1>
<h5>Heading level 5</h1>`;
}

function getCodeHtml(): string | null {
  return ``;
}

function getDocumentationHtml(): string | null {
  return null;
}

