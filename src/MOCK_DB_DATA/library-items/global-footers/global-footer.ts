import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const GlobalFooter: LibraryItem[] = [
  {
    id: ITEMS.GlobalFooter.id,
    title: ITEMS.GlobalFooter.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    fullScreenEnabled: true,
    parent: GROUPS.GlobalFooters,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<footer class="fhi-footer">
  <div class="container fhi-footer__container">
    <div class="row">
      <div class="col-12 mb-2">
        <h2 class="h3">Overskrift</h2>
      </div>

      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 1</span>
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="javascript:void(0)" class="btn fhi-btn-shortcut-link">
          <i class="icon-arrow-right"></i>
          <span class="btn__text">Snarvei 2</span>
        </a>
      </div>
    </div>
  </div>
</footer>`;
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
  return `
<p>Global footer skal alltid ligge på app-rot, slik:</p>
<code class="d-block mb-3">
  &lt;div class="fhi-app"&gt;
    <br>
    <span style="padding-left: 1rem;">...</span>
    <br>

    <span style="padding-left: 1rem;">&lt;footer class="fhi-footer"&gt;</span><br>
      <span style="padding-left: 2rem;">...</span><br>
    <span style="padding-left: 1rem;">&lt;/footer&gt;</span><br>
  &lt;/div&gt;
</code>
<p>Når man benytter global footer er det viktig å bruke Bootstraps grid system i henhold til innholdet man skal ha inn.</p>`;
}
