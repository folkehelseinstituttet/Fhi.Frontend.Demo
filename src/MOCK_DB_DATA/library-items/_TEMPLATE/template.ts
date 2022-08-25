import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Template: LibraryItem[] = [{
  id: 'title',
  title: 'Title',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return ``;
}

function getCodeHtml(): string | null {
  return ``; // Return null to remove Code from library-item
}

function getDocumentationHtml(): string | null {
  return ``; // Return null to remove Documentation from library-item
}

