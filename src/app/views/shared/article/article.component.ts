import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { SegmentPaths } from 'src/app/segment-path';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  title: string;
  articleHtml: any;

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
        this.findSecondLevelDeveloper();
        break;

      case SegmentPaths.designer:
        this.findSecondLevelDesigner();
    }
  }
  private findSecondLevelDeveloper() {
    switch (this.urlService.getSegmentPath(1)) {
      case SegmentPaths.visualIdentity:
        this.title = 'Visuell identitet';
        this.articleHtml = this.getArticleHtmlForDeveloperVisualIdentity();
        break;

      case SegmentPaths.components:
        this.title = 'Komponenter';
        this.articleHtml = this.getArticleHtmlForDeveloperComponents();
    }
  }
  private findSecondLevelDesigner() {
    console.log('findSecondLevelDesigner() not implemented...');
  }

  private getArticleHtmlForDeveloperVisualIdentity(): any {
    return `
<p>
  Her er det bare å fylle på med markup...
</p>
<p>
  <a href="">Lenker og what not...</a>
</p>`;
  }

  private getArticleHtmlForDeveloperComponents(): any {
    return;
  }

}
