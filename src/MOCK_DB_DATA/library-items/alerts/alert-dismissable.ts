import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const AlertDismissible: LibraryItem[] = [{
  id: 'alertdismissible',
  title: 'Alert - dismissible',
  type: LibraryItemType.ngBootstrap,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<ngb-alert [class]="bordered" [type]="type" (closed)="close(alert)">
  <i class="icon-..."></i>
  {{ message }}
</ngb-alert>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  The alert - dismissible is implemented as a
  <a href="${NgBootstrapComponentsBaseUrl}/alert">NgBootstrap alert</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`;
}
