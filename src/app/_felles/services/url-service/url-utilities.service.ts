import { Injectable } from '@angular/core';
import { UrlSegment, Params } from '@angular/router';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilitiesService {

  constructor(private urlService: UrlService) { }

  getParams(): Params {
    return this.urlService.getUrlTree().queryParams;
  }

  getParamValue(paramName: string): string {
    return this.urlService.getUrlTree().queryParams[paramName];
  }

  getSegmentPath(segmentIndex: number): string {
    const urlTree = this.urlService.getUrlTree();
    if (urlTree.root.numberOfChildren !== 0) {
      return urlTree.root.children.primary.segments[segmentIndex].path;
    } else {
      return undefined;
    }
  }

  getCurrentSegmentPath(): string {
    const urlTree = this.urlService.getUrlTree();
    let segments: Array<UrlSegment>;
    if (urlTree.root.numberOfChildren !== 0) {
      segments = urlTree.root.children.primary.segments;
      return segments[segments.length - 1].path;
    } else {
      return undefined;
    }
  }

  getFragment(): string | null {
    const urlTree = this.urlService.getUrlTree();
    return urlTree.fragment;
  }

}
