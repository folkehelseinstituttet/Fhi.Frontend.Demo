import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { SegmentPaths } from '../../segment-paths';

import { MenuItem } from '../../models/menu-item.model';

const TopLevelMenuItemName = {
  components: 'Components',
  colorsAndFonts: 'Colors, Fonts',
  icons: 'Icons'
};

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html'
})
export class DesignerComponent implements OnInit, OnDestroy {

  topLevelMenuItems!: MenuItem[];
  secondLevelMenuItems!: MenuItem[];

  private subscription: Subscription = new Subscription();

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    this.topLevelMenuItems = this.getTopLevelMenuItems();
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        console.log(this.urlService.getAbsolutePath());
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getTopLevelMenuItems(): MenuItem[] {
    return [{
      name: TopLevelMenuItemName.components,
      link: `/${SegmentPaths.designer}/${SegmentPaths.components}`
    }, {
      name: TopLevelMenuItemName.colorsAndFonts,
      link: `/${SegmentPaths.designer}/${SegmentPaths.colorsAndFonts}`
    }, {
      name: TopLevelMenuItemName.icons,
      link: `/${SegmentPaths.designer}/${SegmentPaths.iconsDeprecated}`
    }];
  }

}
