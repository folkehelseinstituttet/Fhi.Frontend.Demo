import { Component, Input } from '@angular/core';

import { FhiTreeViewNavigationItem } from '@folkehelseinstituttet/angular-components';
import { SharedConstants as CONST } from '../../shared.constants';

@Component({
  selector: 'app-library-second-level-menu',
  templateUrl: './library-second-level-menu.component.html',
})
export class LibrarySecondLevelMenuComponent {
  @Input() menuItems: Array<FhiTreeViewNavigationItem>;

  lang_NO: string = CONST.languageLocaleId_NO;
  lang_EN: string = CONST.languageLocaleId_EN;
  leftMenuMobileTriggerOpen = false;
}
