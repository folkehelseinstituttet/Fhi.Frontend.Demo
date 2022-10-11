import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { SegmentPaths } from 'src/app/segment-path';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        this.findTopLevel();
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private findTopLevel() {
    switch (this.urlService.getSegmentPath(0)) {
      case SegmentPaths.developer:
        this.findSecondLevel(SegmentPaths.developer);
        break;

      case SegmentPaths.designer:
        this.findSecondLevel(SegmentPaths.designer);
    }
  }

  private findSecondLevel(topLevel: string) {
    switch (this.urlService.getSegmentPath(1)) {
      case SegmentPaths.visualIdentity:
        console.log(topLevel + ': visualIdentity');
        break;

      case SegmentPaths.components:
        console.log(topLevel + ': components');
        break;

      case SegmentPaths.modules:
        console.log(topLevel + ': modules');
    }
  }

}
