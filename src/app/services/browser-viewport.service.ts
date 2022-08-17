import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserViewportService {

  private innerWidth: number;
  private isMobileSource = new ReplaySubject<boolean>(1);
  private isDesktopSmallSource = new ReplaySubject<boolean>(1);
  private breakpointSource = new ReplaySubject<string>(1);
  private windowInnerHeightSource = new BehaviorSubject<number>(window.innerHeight);

  isMobile$ = this.isMobileSource.asObservable();
  isDesktopSmall$ = this.isDesktopSmallSource.asObservable();
  breakpoint$ = this.breakpointSource.asObservable();
  windowInnerHeight$ = this.windowInnerHeightSource.asObservable();

  initResponsiveProperties() {
    this.updateResponsiveProperties();
  }

  updateResponsiveProperties() {
    this.updateWindowInnerHeight();
    this.updateIsMobile();
    this.updateIsDesktop();
    this.updateBreakpoint();
  }

  updateWindowInnerHeight() {
    this.windowInnerHeightSource.next(window.innerHeight);
  }

  updateIsMobile() {
    if (window.innerWidth !== this.innerWidth) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.isMobileSource.next(true);
      } else {
        this.isMobileSource.next(false);
      }
    }
  }

  updateIsDesktop() {
    if (window.innerWidth !== this.innerWidth) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth > 1200 && this.innerWidth < 1680) {
        this.isDesktopSmallSource.next(true);
      } else {
        this.isDesktopSmallSource.next(false);
      }
    }
  }

  updateBreakpoint() {
    if (window.innerWidth !== this.innerWidth) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 576) {
        this.breakpointSource.next('xs');
      } else if (this.innerWidth < 768) {
        this.breakpointSource.next('sm');
      } else if (this.innerWidth < 992) {
        this.breakpointSource.next('md');
      } else if (this.innerWidth < 1200) {
        this.breakpointSource.next('lg');
      } else if (this.innerWidth < 1680) {
        this.breakpointSource.next('xl');
      } else {
        this.breakpointSource.next('xxl');
      }
    }
  }

}
