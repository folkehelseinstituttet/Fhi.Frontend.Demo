import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const FhiFontColors: LibraryItem[] = [{
  title: 'Font colors',
  type: LibraryItemType.html,
  exampleHtml: `
<!--
  NB! This code is not concidered best practice, but is an attempt to
  show a few different strategies related to the Bootstrap framework.
  When the FHI "best practice" is defined, this code will be changed.
-->
<div class="row">
  <div class="col-sm p-3 pt-5">
    <p><strong>Regular text</strong></p>
    <p class="fhi-text-ancillary"><strong>Ancillary text</strong></p>
    <p><a href="#">Link text</a></p>
    <p class="text-muted"><strong>Disabled</strong></p>
    <p class="text-error"><strong>Error</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-dark">
    <p class="text-white"><strong>Regular text</strong></p>
    <p class="fhi-text-ancillary-inverse"><strong>Ancillary text</strong></p>
    <p><a href="#" class="text-white">Link text</a></p>
    <p class="fhi-text-disabled-inverse"><strong>Disabled</strong></p>
    <p class="fhi-text-error-inverse"><strong>Error</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-primary">
    <p class="text-white"><strong>Regular text</strong></p>
  </div>
</div>`
}];
