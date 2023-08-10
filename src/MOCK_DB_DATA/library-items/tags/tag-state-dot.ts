import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const TagStateDot: LibraryItem[] = [{
  id: LibraryItemIds.TagStateDot,
  title: 'Tag - state dot',
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
<p>
  <span class="fhi-tag fhi-tag--state-dot">
    <i class="fhi-tag--state-dot__icon--info"></i>
    System 1 er klart
  </span>
</p>
<p>
  <span class="fhi-tag fhi-tag--state-dot">
    <i class="fhi-tag--state-dot__icon--on"></i>
    System 2 slått på
  </span>
</p>
<p>
  <span class="fhi-tag fhi-tag--state-dot">
    <i class="fhi-tag--state-dot__icon--warning"></i>
    System 3 - advarsel
  </span>
</p>
<p>
  <span class="fhi-tag fhi-tag--state-dot">
    <i class="fhi-tag--state-dot__icon--off"></i>
    System 4 - av
  </span>
</p>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<span class="fhi-tag fhi-tag--state-dot">
  <i class="fhi-tag--state-dot__icon--info"></i>
  System 1 er klart
</span>

<span class="fhi-tag fhi-tag--state-dot">
  <i class="fhi-tag--state-dot__icon--on"></i>
  System 2 slått på
</span>

<span class="fhi-tag fhi-tag--state-dot">
  <i class="fhi-tag--state-dot__icon--warning"></i>
  System 3 - advarsel
</span>

<span class="fhi-tag fhi-tag--state-dot">
  <i class="fhi-tag--state-dot__icon--off"></i>
  System 4 - av
</span>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Brukes til å vise om noe er tilgjengelig, avslått, utenfor rekkevide eller i en uvirksom tilstand.</p>`;
}
