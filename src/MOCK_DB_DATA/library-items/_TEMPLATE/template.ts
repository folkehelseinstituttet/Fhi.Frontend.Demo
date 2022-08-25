import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Template: LibraryItem[] = [{
  title: 'Title',
  type: LibraryItemType.html,
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getCodeHtml(): string {
  return `
<div>
  <p>markup for example<p>
</div>
`;
}

function getDocumentationHtml(): string {
  return `
<p>
  Bootstrap documentation for
  <a href="${BootstrapComponentsBaseUrl}/path/to/doc">Title</a>
</p>
<p>
  The accordion is implemented as a
  <a href="${NgBootstrapComponentsBaseUrl}/path/to/doc">NgBootstrap Title</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`;
}

