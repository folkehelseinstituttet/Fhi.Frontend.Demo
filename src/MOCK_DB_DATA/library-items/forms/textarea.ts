import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const Textarea: LibraryItem[] = [{
  id: LibraryItemIds.FormTextarea,
  title: 'Textarea',
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
<label for="exampleFormControlTextarea1" class="form-label" aria-describedby="hjelpeTekst2">Tekstfelt med flere linjer</label>
<p class="form-text" id="hjelpeTekst2">Hjelpetekst, f.eks "Valgfritt felt"</p>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
