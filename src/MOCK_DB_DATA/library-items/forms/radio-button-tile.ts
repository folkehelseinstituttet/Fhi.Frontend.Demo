import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const RadioButtonTile: LibraryItem[] = [{
  id: LibraryItemIds.FormRadioButtonTile,
  title: 'Radio Button Tile',
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
function getCodeHtml(): string | null {
  return `
<div class="fhi-form-check-tile">
  <input class="fhi-form-check-tile__input form-check-input" type="radio" name="radioButtonTiles" id="uid">
  
  <label class="fhi-form-check-tile__label form-check-label" for="uid">
    <span class="fhi-form-check-tile__label-text">Ledetekst</span>
    <span class="fhi-form-check-tile__label-addition">Kort beskrivelse om behov</span>
  </label>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
