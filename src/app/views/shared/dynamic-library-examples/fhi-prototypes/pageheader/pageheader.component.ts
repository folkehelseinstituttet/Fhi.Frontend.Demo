import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
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
  logoHidden: boolean = false;
  data: any = [];
  submenuOverflow: boolean = false;
  submenuWidth: number = 0;

  windowScroll$: Subscription = Subscription.EMPTY;
  modalScroll$: Subscription = Subscription.EMPTY;

  @ViewChild('pageheadercomponent', { static: true }) pageheadercomponent: ElementRef;
  @ViewChild('pageheadersubmenucontainer', { static: true }) pageheadersubmenucontainer: ElementRef;
  @ViewChild('pageheadersubmenu', { static: true }) pageheadersubmenu: ElementRef;

  constructor(private dataService: PrototypePageheaderDataService) {}

  ngOnInit() {
    this.data = this.dataService.getNodes();

    // throttle based on
    // https://stackblitz.com/edit/angular-throttled-window-scroll-mq22ws
    this.windowScroll$ = fromEvent(window, 'scroll')
      .pipe(throttleTime(250))//throttleTime must be more than transition time in css
      .subscribe(() => {
        this.onScroll(window);
      });
    
    this.modalScroll$ = fromEvent(this.pageheadercomponent.nativeElement, 'scroll')
      .pipe(throttleTime(250))
      .subscribe(() => {
        this.onScroll(this.pageheadercomponent.nativeElement);
      });
  }
  
  ngOnDestroy() {
    this.windowScroll$.unsubscribe();
  }

  ngAfterViewChecked() {
    this.submenuSetup();
  }

  onScroll(element: any) {
    let scroll: any;

    if (element === window) {
      scroll = element.pageYOffset;
    } else {
      scroll = element.scrollTop;
    }
    
    if (scroll > 112 && scroll > this.currentVerticalScrollPosition) {
      this.logoHidden = true;
    } else {
      this.logoHidden = false;
    }
    this.currentVerticalScrollPosition = scroll;
  }

  submenuSetup() {
    this.submenuOverflow = false;

    let submenuContainerWidth: number = this.pageheadersubmenucontainer.nativeElement.offsetWidth;
    let submenuItemsWidths: any = [];
    let submenuItemsTotalWidth: number = 0;
    let submenuItemSelector: any = this.pageheadersubmenu.nativeElement.querySelectorAll('.fhi-pageheader__submenu-item');
    let numSubmenuItems: number = submenuItemSelector.length;
    let currentItemWidth: number;
    let submenuConfiguredWidth: number = 0;

    for (let i = 0; i < numSubmenuItems; i++) {
      currentItemWidth = submenuItemSelector[i].offsetWidth;
      submenuItemsWidths.push(currentItemWidth);
      submenuItemsTotalWidth += currentItemWidth;
    }

    for (let j = 0; j < submenuItemsWidths.length; j++) {
      if (submenuConfiguredWidth < submenuItemsTotalWidth / 2) {
        submenuConfiguredWidth += submenuItemsWidths[j];
      } else {
        submenuConfiguredWidth += 1;//sic
        j = submenuItemsWidths.length;
      }
    }
    
    if (submenuContainerWidth > 0 && submenuItemsTotalWidth > (submenuContainerWidth - 32) * 2) {
      console.log(submenuItemsTotalWidth, (submenuContainerWidth - 8) * 2);
      this.submenuWidth = submenuConfiguredWidth;
      this.submenuOverflow = true;
    }
  }

  linkSwitch(num: number) {
    this.activeLink = num;
  }
}
