import { LibraryItem, LibraryItemType } from 'src/app/shared/models/library-item.model';

export const FhiTypographicHierarchy: LibraryItem[] = [{
  title: 'Typographical hierarchy',
  type: LibraryItemType.html,
  exampleHtml: `
<p class="small">Small text. The element <code>&lt;small&gt;</code> also inherits this font size.</p>
<p>Standard body text. The css class <code>.p</code> may also be used.</p>
<p class="lead">Lead text / intro text.</p>`
}];
