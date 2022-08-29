import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Alert: LibraryItem[] = [{
  id: 'alert',
  title: 'Alert',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="alert alert-info">
  <i class="icon-info-circle"></i>
  Default alert.
</div>
<div class="alert alert-success">
  <i class="icon-check-circle-regular"></i>
  Success!
</div>
<div class="alert alert-warning">
  <i class="icon-bell-regular"></i>
  Warning!
</div>
<div class="alert alert-error">
  <i class="icon-bell-regular"></i>
  Error!
</div>
<div class="alert alert-info fhi-alert-bordered">
  <i class="icon-info-circle"></i>
  Information.
</div>
<div class="alert alert-success fhi-alert-bordered">
  <i class="icon-check-circle-regular"></i>
  Success!
</div>
<div class="alert alert-warning fhi-alert-bordered">
  <i class="icon-bell-regular"></i>
  Warning!
</div>
<div class="alert alert-error fhi-alert-bordered">
  <i class="icon-bell-regular"></i>
  Error!
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="alert">
  <i class="icon-info-circle"></i>
  Alert!
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap documentation for
  <a href="${BootstrapComponentsBaseUrl}/alerts">Alerts</a>
</p>
<p>
  Alerts are available as:
</p>
<ul>
  <li>
    <code>alert-info</code> (default, same as <code>alert</code>)
  </li>
  <li>
    <code>alert-success</code>
  </li>
  <li>
    <code>alert-warning</code>
  </li>
  <li>
    <code>alert-error</code>
  </li>
</ul>
<p class="pt-3">
  For bordered alerts with white background, add <code>fhi-alert-bordered</code> in addition to the state.
</p>`;
}
