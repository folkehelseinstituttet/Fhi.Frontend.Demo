import { Injectable } from '@angular/core';
import { NavigationExtras, UrlTree, Router, NavigationEnd, UrlSegment, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { UrlNavigateOptions } from '../models/url-navigate-options.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: Router) { }

  private updateTimestamp: number;
  private urlSubject = new ReplaySubject<void>(1);
  URL$ = this.urlSubject.asObservable();

  previousUrlAfterRedirects: string;
  previousUrlTree: UrlTree;
  urlTree: UrlTree;

  updateOnNavigationEnd(event: NavigationEnd) {
    if (this.previousUrlAfterRedirects) {
      this.previousUrlTree = this.router.parseUrl(this.previousUrlAfterRedirects);
    } else {
      this.previousUrlTree = undefined;
    }

    this.previousUrlAfterRedirects = event.urlAfterRedirects;

    const urlTree = this.router.parseUrl(event.urlAfterRedirects);
    if (this.urlTree !== urlTree) {
      this.urlTree = urlTree;
      this.urlSubject.next();
    }
    this.checkForMultipleUpdates(Date.now());
  }

  navigate(options?: UrlNavigateOptions) {
    const url = this.getNavigateUrl(options);
    const navigationExtras = this.getNavigateNavigationExtras(options);
    this.router.navigateByUrl(url, navigationExtras);
  }

  setParamValue(paramName: string, value: string) {
    if (!value || value.length === 0) {
      delete this.urlTree.queryParams[paramName];
    } else {
      let queryParams = this.urlTree.queryParams;
      queryParams = Object.assign(queryParams, { [paramName]: value });
    }
  }

  getParams(): Params {
    return this.urlTree.queryParams;
  }

  getParamValue(paramName: string): string {
    return this.urlTree.queryParams[paramName];
  }

  getPreviousParamValue(paramName: string): string {
    return this.previousUrlTree?.queryParams[paramName];
  }

  getSegmentPath(segmentIndex: number): string {
    const root = this.urlTree.root;
    if (root.numberOfChildren !== 0) {
      return root.children.primary.segments[segmentIndex]?.path;
    } else {
      return undefined;
    }
  }

  getPreviousSegmentPath(segmentIndex: number): string {
    const root = this.previousUrlTree?.root;
    if (root !== undefined && root.numberOfChildren !== 0) {
      return root.children.primary.segments[segmentIndex]?.path;
    } else {
      return undefined;
    }
  }

  getLastSegmentPath(): string {
    const root = this.urlTree.root;
    let segments: Array<UrlSegment>;
    if (root.numberOfChildren !== 0) {
      segments = root.children.primary.segments;
      return segments[segments.length - 1].path;
    } else {
      return undefined;
    }
  }

  getAbsolutePath(): string {
    const root = this.urlTree.root;
    let allSegments = '';
    if (root.numberOfChildren !== 0) {
      root.children.primary.segments.forEach(segment => {
        allSegments = allSegments.concat('/', segment.path);
      });
      return allSegments;
    } else {
      return undefined;
    }
  }

  getFragment(): string | null {
    return this.urlTree.fragment;
  }

  deleteParam(paramName: string) {
    delete this.urlTree.queryParams[paramName];
  }

  deleteAllParams() {
    this.urlTree.queryParams = [];
  }

  private getNavigateUrl(options?: UrlNavigateOptions): string | UrlTree {
    if (options?.absolutePath !== undefined) {
      return options.absolutePath;
    } else {
      return this.urlTree;
    }
  }

  private getNavigateNavigationExtras(options?: UrlNavigateOptions): NavigationExtras {
    if (options?.navigationExtras !== undefined) {
      return options.navigationExtras;
    } else {
      return { skipLocationChange: false };
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
