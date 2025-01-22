import { Component, Input } from '@angular/core';

import { FhiTreeViewNavigationItem } from '@folkehelseinstituttet/angular-components';

@Component({
    selector: 'app-library-second-level-menu',
    templateUrl: './library-second-level-menu.component.html',
    standalone: false
})
export class LibrarySecondLevelMenuComponent {
  @Input() menuItems: Array<FhiTreeViewNavigationItem>;

  leftMenuMobileTriggerOpen = false;
}
