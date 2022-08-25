import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const TypographicHierarchy: LibraryItem[] = [{
  id: 'typographicalhierarchy',
  title: 'Typographical hierarchy',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<p class="small">Small text. The element <code>&lt;small&gt;</code> also inherits this font size.</p>
<p>Standard body text. The css class <code>.p</code> may also be used.</p>
<p class="lead">Lead text / intro text.</p>`;
}

function getCodeHtml(): string | null {
  return ``; // Return null to remove Code from library-item
}

function getDocumentationHtml(): string | null {
  return null;
}
