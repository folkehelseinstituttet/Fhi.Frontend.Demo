import { Injectable } from '@angular/core';
import { UrlTree, UrlSegment, Params } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private urlOppdaterttidspunkt: number;

  private alleUrlParametereSubject = new Subject<Params>();
  private urlSegmenterSubject = new Subject<UrlSegment[]>();
  alleUrlParametere$ = this.alleUrlParametereSubject.asObservable();
  urlSegmenter$ = this.urlSegmenterSubject.asObservable();

  urlTre: UrlTree;
  urlSegmenter: UrlSegment[];
  urlFragment: string;
  urlUtenParmetere: string;
  alleUrlParametere: Params;
  registrerteUrlParametere: Array<string>;

  updateAfterNavigationEnd(urlTre: UrlTree): void {
    this.sjekkForDobbelOppdatering();
    this.urlTre = urlTre;
    this.urlSegmenter = this.getSegments();
    this.urlFragment = this.getFragment();
    this.alleUrlParametere = this.getQueryParams();

    if (this.urlSegmenter !== undefined) {
      this.urlSegmenterSubject.next(this.urlSegmenter);
    }
    if (this.alleUrlParametere !== undefined) {
      this.alleUrlParametereSubject.next(this.alleUrlParametere);
    }
  }

  updateUrlTree(params: Params, fragment?: string): void {
    this.urlTre.queryParams = Object.assign(this.alleUrlParametere, params);
    this.urlTre.fragment = fragment;
  }

  registrerNyParameter(nyParameterNavn: string): void {
    if (this.registrerteUrlParametere === undefined) {
      this.registrerteUrlParametere = [nyParameterNavn];
    } else if (!this.registrerteUrlParametere.includes(nyParameterNavn)) {
      this.registrerteUrlParametere.push(nyParameterNavn);
    } else {
      const errorMsg = 'UrlService.registrerNyParameter(): UrlParam med navn "'
        + nyParameterNavn + '" kan ikke registreres mer enn en gang!';
      throw new Error(errorMsg);
    }
  }

  private getSegments(): Array<UrlSegment> {
    if (this.urlTre.root.numberOfChildren !== 0) {
      return this.urlTre.root.children.primary.segments;
    } else {
      return undefined;
    }
  }

  private getFragment(): any {
    if (this.urlTre.fragment) {
      return this.urlTre.fragment;
    } else {
      return undefined;
    }
  }

  private getQueryParams(): Params {
    return this.urlTre.queryParams;
  }

  private sjekkForDobbelOppdatering(): void {
    const tidsdifferanse = Date.now() - this.urlOppdaterttidspunkt;
    const errorMsg = 'UrlService.sjekkForDobbelOppdatering(): '
      + 'TIDEN MELLOM TO OPPDATERINGER AV URL ER < 75 MS!\n'
      + 'Dette kan tyde på at det er introdusert en dobbel oppdatering av URL!\n'
      + 'Differanse [ms]: ' + tidsdifferanse;

    if (tidsdifferanse < 75) {
      console.error(errorMsg);
    }
    this.urlOppdaterttidspunkt = Date.now();
  }

}
