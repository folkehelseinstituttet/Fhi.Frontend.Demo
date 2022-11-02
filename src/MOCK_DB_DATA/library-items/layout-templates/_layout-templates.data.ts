import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { LayoutTemplateBasic } from './layout-template-basic';
import { LayoutTemplateTwoCols1 } from './layout-template-two-cols-1';

export const LayoutTemplatesData: LibraryItem[] = [
  ...LayoutTemplateBasic,
  ...LayoutTemplateTwoCols1
];
