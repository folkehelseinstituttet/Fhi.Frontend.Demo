import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { PrototypePageheaderDataService } from './pageheader-data.service';

@Component({
  selector: 'app-prototype-pageheader',
  templateUrl: './pageheader.component.html',
  providers: [PrototypePageheaderDataService],
})
export class PrototypePageheaderComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  activeLink = -1;
  mainMenuIsOpen = false;
  hideMostContent = true;
  currentVerticalScrollPosition: number;
  logoHidden = false;
  data: any = [];
  scrollThreshold = 112;
  submenuOverflow = false;
  submenuWidth = 0;
  specialMenuIsOpen = false;
  closingSpecialMenu = false;

  windowScroll$: Subscription = Subscription.EMPTY;
  modalScroll$: Subscription = Subscription.EMPTY;

  @ViewChild('pageheadercomponent', { static: true }) pageheadercomponent: ElementRef;
  @ViewChild('pageheadersubmenucontainer', { static: true }) pageheadersubmenucontainer: ElementRef;
  @ViewChild('pageheadersubmenu', { static: true }) pageheadersubmenu: ElementRef;

  constructor(private dataService: PrototypePageheaderDataService) {}

  ngOnInit() {
    this.data = this.dataService.getNodes();

    //throttleTime must be more than transition time in css (.fhi-pageheader__submenu)
    this.windowScroll$ = fromEvent(window, 'scroll')
      .pipe(throttleTime(250))
      .subscribe(() => {
        this.onScroll(window);
      });

    this.modalScroll$ = fromEvent(this.pageheadercomponent.nativeElement, 'scroll')
      .pipe(throttleTime(250))
      .subscribe(() => {
        this.onScroll(this.pageheadercomponent.nativeElement);
      });

    this.submenuWidth = 100;
  }

  ngAfterViewChecked() {
    this.submenuSetup();
  }

  ngOnDestroy() {
    this.windowScroll$.unsubscribe();
  }

  onScroll(element: any) {
    let scroll: any;

    if (element === window) {
      scroll = element.pageYOffset;
    } else {
      scroll = element.scrollTop;
    }

    if (scroll > this.scrollThreshold && scroll > this.currentVerticalScrollPosition) {
      this.logoHidden = true;
    } else {
      this.logoHidden = false;
    }
    this.currentVerticalScrollPosition = scroll;
  }

  submenuSetup() {
    this.submenuOverflow = false;

    const submenuContainerWidth: number = this.pageheadersubmenucontainer.nativeElement.offsetWidth;
    const submenuItemsWidths: any = [];
    let submenuItemsTotalWidth = 0;
    const submenuItemSelector: any = this.pageheadersubmenu.nativeElement.querySelectorAll(
      '.fhi-pageheader__submenu-item',
    );
    const numSubmenuItems: number = submenuItemSelector.length;
    let currentItemWidth: number;
    let submenuConfiguredWidth = 0;
    const xPadding = 32;

    for (let i = 0; i < numSubmenuItems; i++) {
      currentItemWidth = submenuItemSelector[i].offsetWidth;
      submenuItemsWidths.push(currentItemWidth);
      submenuItemsTotalWidth += currentItemWidth;
    }

    for (let j = 0; j < submenuItemsWidths.length; j++) {
      if (submenuConfiguredWidth < submenuItemsTotalWidth / 2) {
        submenuConfiguredWidth += submenuItemsWidths[j];
      } else {
        submenuConfiguredWidth += 1; //sic
        j = submenuItemsWidths.length;
      }
    }

    if (
      submenuContainerWidth > 0 &&
      submenuItemsTotalWidth > (submenuContainerWidth - xPadding) * 2
    ) {
      this.submenuWidth = submenuConfiguredWidth;
      this.submenuOverflow = true;
    }
  }

  linkSwitch(num: number) {
    this.activeLink = num;
  }

  toggleSpecialMenu(closing?: boolean) {
    if (closing) {
      this.specialMenuIsOpen = false;
    } else {
      this.specialMenuIsOpen = !this.specialMenuIsOpen;
    }

    if (!this.specialMenuIsOpen) {
      this.closingSpecialMenu = true;
    }

    setTimeout(() => {
      this.closingSpecialMenu = false;
    }, 400); // a little longer timeout than animation speed for the .closing
  }
}
