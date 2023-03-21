import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const IconSet: LibraryItem[] = [{
  id: LibraryItemIds.IconSet,
  title: 'Ikonsett',
  type: LibraryItemType.fhiAngular,
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
function getCodeHtml(): string {
  return `
<i class="icon-[name] icon-[size]"></i>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Se <a href="https://github.com/folkehelseinstituttet/Fhi.Frontend.Style/tree/main/src/fhi/icons#readme">detaljer om ikonsystemet</a> på Github, og hvordan du kan lage ditt eget subset.</p>
<p>Savner du et ikon? Se kontaktinfo nederst på siden.</p>`;
}
