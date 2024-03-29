import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { UrlSegment } from 'src/app/url-segment.constants';
import { LibraryItemConstants as CONST } from 'src/MOCK_DB_DATA/library-items/library-item-constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  title: string;
  articleHtml: string;

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.subscription.add(
      this.urlService.URL$.subscribe(() => {
        this.findTopLevel();
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private findTopLevel() {
    switch (this.urlService.getSegmentPath(0)) {
      case UrlSegment.developer:
        this.findSecondLevelDeveloper();
        break;

      case UrlSegment.designer:
        this.findSecondLevelDesigner();
    }
  }
  private findSecondLevelDeveloper() {
    switch (this.urlService.getSegmentPath(1)) {
      case UrlSegment.visualIdentity:
        this.title = 'Visuell identitet i FHI';
        this.articleHtml = this.getArticleHtmlForDeveloperVisualIdentity();
        break;

      case UrlSegment.components:
        this.title = 'Komponenter';
        this.articleHtml = this.getArticleHtmlForDeveloperComponents();
        break;

      case UrlSegment.layoutAndPageTemplates:
        this.title = 'Layout og sidemaler';
        this.articleHtml = this.getArticleHtmlForDeveloperLayoutAndPageTemplates();
        break;

      case UrlSegment.prototypes:
        this.title = 'Eksempler på bruk';
        this.articleHtml = this.getArticleHtmlForDeveloperPrototypes();
        break;
    }
  }
  private findSecondLevelDesigner() {
    console.log('findSecondLevelDesigner() not implemented...');
  }

  private getArticleHtmlForDeveloperVisualIdentity(): string {
    return `
<p>For at alle våre produkter skal ha en tydelig og gjenkjennbar profil må farger, ikonbruk, typografi, logo og illustrasjoner henge sammen og brukes konsistent.</p>`;
  }

  private getArticleHtmlForDeveloperComponents(): string {
    return `
<p>Komponentbiblioteket i FHI Designsystem baserer seg på <a href="${CONST.BootstrapBaseUrl}">Bootstrap 5</a>. Interaktive komponenter benytter <a href="${CONST.NgBootstrapBaseUrl}" class="text-nowrap">ng-bootstrap</a> og andre tredjepartskomponenter der disse finnes. I tillegg er noen skreddersydde Angularkomponenter produsert av FHI.</p>

<p>Alle løsninger kan konsumere stilsettet uavhengig av hvilket rammeverk som er benyttet. Legg til CSS fra FHI Designsystem: <a href="https://www.npmjs.com/package/@folkehelseinstituttet/style">@folkehelseinstituttet/style</a>.</p>

<p>FHI Designsystem bygges i Angular og løsninger som benytter annet frontendrammeverk er ansvarlige for å generere riktig markup slik at utseendet blir korrekt.</p>

<p><a href="https://github.com/folkehelseinstituttet/Fhi.Frontend.Style/blob/main/CHANGELOG.md">Se changelog for stilsettet her.</a></p>`;
  }

  private getArticleHtmlForDeveloperLayoutAndPageTemplates(): string {
    return `
<p>Her finner du eksempler på hvordan man plasserer innholdet på en side.</p>`;
  }

  private getArticleHtmlForDeveloperPrototypes(): string {
    return `
<p>Her finner du eksempler på større enheter og klikkbare prototyper ofte produsert for spesifikke prosjekter.</p>`;
  }
}
