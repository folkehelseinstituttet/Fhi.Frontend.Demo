import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const IconSet: LibraryItem[] = [{
  id: 'icon-set',
  title: 'Icon set',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<div class="flex flex-wrap ds-icons-wrapper">
  ${getCodeHtml()}
</div>`;
}

function getCodeHtml(): string {
  return `
<i class="icon-alcohol-drugs"></i>
<i class="icon-bell-regular"></i>
<i class="icon-cancer"></i>
<i class="icon-cancer-cell"></i>
<i class="icon-cancer-cell-2"></i>
<i class="icon-cardio"></i>
<i class="icon-cards"></i>
<i class="icon-check-circle-regular"></i>
<i class="icon-chevron-down"></i>
<i class="icon-chevron-down-fat"></i>
<i class="icon-chevron-expand"></i>
<i class="icon-chevron-up"></i>
<i class="icon-circle-regular"></i>
<i class="icon-clap"></i>
<i class="icon-description"></i>
<i class="icon-diabetes"></i>
<i class="icon-ellipsis-v"></i>
<i class="icon-envelope-regular"></i>
<i class="icon-environment"></i>
<i class="icon-file-excel-regular"></i>
<i class="icon-insight"></i>
<i class="icon-muscle"></i>
<i class="icon-no-handwash"></i>
<i class="icon-population"></i>
<i class="icon-question-circle-regular"></i>
<i class="icon-suicide"></i>
<i class="icon-swap"></i>
<i class="icon-trash-alt-regular"></i>
<i class="icon-user-regular"></i>
`;
}

function getDocumentationHtml(): string {
  return undefined;
}

