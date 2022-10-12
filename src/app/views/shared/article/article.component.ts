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
    return `
<p>Komponentbiblioteket i FHI Designsystem baserer seg på <a href="https://getbootstrap.com/docs/5.2/getting-started/introduction/">Bootstrap 5</a>. Interaktive komponenter benytter <a href="https://ng-bootstrap.github.io/" class="text-nowrap">ng-bootstrap</a> og andre tredjeparts-komponenter der disse finnes. I tillegg er noen skreddersydde Angular-komponenter produsert av FHI.</p>

<p>Alle løsninger kan konsumere stilsettet uavhengig av benyttet rammeverk i enhver løsning. Legg til CSS fra FHI Designsystem: <a href="https://www.npmjs.com/package/@folkehelseinstituttet/style">@folkehelseinstituttet/style</a>.</p>

<p>FHI Designsystem bygges i Angular og løsninger som benytter annet frontend-rammeverk og konsumerer stilsettet er da ansvarlige for å generere riktig markup slik at utseendet blir korrekt.</p>

<p><a href="https://github.com/folkehelseinstituttet/Fhi.Frontend.Style/blob/main/CHANGELOG.md">Se changelog for stilsettet her.</a></p>`;
  }

}
