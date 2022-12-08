import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { PrototypePageheaderDataService } from './pageheader-data.service';

@Component({
  selector: 'app-prototype-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss'],
  providers: [PrototypePageheaderDataService]
})
export class PrototypePageheaderExampleComponent {
  activeLink: number = -1;
  mainMenuIsOpen: boolean = false;
  hideMostContent: boolean = true;
  currentVerticalScrollPosition: number;
  currentPosition: number;
  data: any = [];

  constructor(private dataService: PrototypePageheaderDataService, @Inject(DOCUMENT) private _document: Document) {
    this._document.addEventListener('scroll', this.onPageContentScrolled);
  }
  
  ngOnDestroy() {
    this._document.removeEventListener('scroll', this.onPageContentScrolled);
  }
  
  onPageContentScrolled = (e:any) => {
    let scroll = window.pageYOffset;
    if (scroll > this.currentVerticalScrollPosition) {
      console.log('scrollDown');
    } else {
      console.log('scrollUp');
    }
    this.currentVerticalScrollPosition = scroll;
  }
  
  @HostListener("scroll", ['$event.target'])
  onContentScrolled(e: HTMLElement) {
    let scroll = e.scrollTop;
    if (scroll > this.currentPosition) {
      console.log("scrollDown");
    } else {
      console.log("scrollUp");
    }
    this.currentPosition = scroll;
  }

  ngOnInit() {
    this.data = this.dataService.getNodes();
  }

  linkSwitch(num: number) {
    this.activeLink = num;
  }

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }
}
