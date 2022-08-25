import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

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
<h1>Level 1</h1>
<h2>Level 2</h1>
<h3>Level 3</h1>
<h4>Level 4</h1>
<h5>Level 5</h1>`;
}

function getCodeHtml(): string | null {
  return ``; // Return null to remove Code from library-item
}

function getDocumentationHtml(): string | null {
  return null;
}

