import { Injectable } from '@angular/core';
import { NavigationExtras, UrlTree, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: Router) { }

  private updateTimestamp: number;
  private urlTree: UrlTree;

  private urlTreeSubject = new Subject<UrlTree>();
  urlTree$ = this.urlTreeSubject.asObservable();

  urlParamsInRegistry: Array<string>;

  updateOnNavigationEnd(urlTree: UrlTree) {
    this.checkForMultipleUpdates(Date.now());
    if (this.urlTree !== urlTree) {
      this.urlTree = urlTree;
      this.urlTreeSubject.next(urlTree);
    }
  }

  getUrlTree() {
    return this.urlTree;
  }

  updateUrlTree(params: Params) {
    this.urlTree.queryParams = Object.assign(this.urlTree.queryParams, params);
  }

  navigate(navigationExtras?: NavigationExtras) {
    const extras: NavigationExtras = (navigationExtras) ? navigationExtras : { skipLocationChange: false };
    this.router.navigateByUrl(this.urlTree, extras);
  }

  addToParamsRegistry(urlParamName: string) {
    const registryIsEmpty = this.urlParamsInRegistry === undefined;
    const urlParamNotInRegistry = !registryIsEmpty && !this.urlParamsInRegistry.includes(urlParamName);
    const errorMessage = 'UrlService.addToParamsRegistry(): UrlParam with name "'
      + urlParamName + '" cant not be added more than once.';

    if (registryIsEmpty) {
      this.urlParamsInRegistry = [urlParamName];
    } else if (urlParamNotInRegistry) {
      this.urlParamsInRegistry.push(urlParamName);
    } else {
      throw new Error(errorMessage);
    }
  }

  private checkForMultipleUpdates(timestamp: number) {
    const interval = timestamp - this.updateTimestamp;
    const errorMessage = 'UrlService.checkForMultipleUpdates(): '
      + 'Elapsed time between two url updates is < 75 ms\n'
      + 'This is an indication that an url update has been called '
      + 'without an user event, which is the intended usecase.\n'
      + 'Diff [ms]: ' + interval;

    if (interval < 75) {
      console.error(errorMessage);
    }
    this.updateTimestamp = timestamp;
  }

}
