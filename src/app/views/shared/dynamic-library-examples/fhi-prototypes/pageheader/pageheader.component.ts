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
  windowScroll$: Subscription = Subscription.EMPTY;
  modalScroll$: Subscription = Subscription.EMPTY;

  @ViewChild('pageheadercomponent', { static: true }) pageheadercomponent: ElementRef;

  constructor(private dataService: PrototypePageheaderDataService) {}

  ngOnInit() {
    this.data = this.dataService.getNodes();

    // throttle based on
    // https://stackblitz.com/edit/angular-throttled-window-scroll-mq22ws
    this.windowScroll$ = fromEvent(window, 'scroll')
      .pipe(throttleTime(400))
      .subscribe(() => {
        this.onScroll(window);
        console.log('window scroll');
      });
    
    this.modalScroll$ = fromEvent(this.pageheadercomponent.nativeElement, 'scroll')
      .pipe(throttleTime(400))
      .subscribe(() => {
        this.onScroll(this.pageheadercomponent.nativeElement);
        console.log('modal scroll');
      });
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
    
    if (scroll > this.currentVerticalScrollPosition) {
      this.logoHidden = true;
    } else {
      this.logoHidden = false;
    }
    this.currentVerticalScrollPosition = scroll;
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
function onContentScrolled(e: any, HTMLElement: { new(): HTMLElement; prototype: HTMLElement; }) {
  throw new Error('Function not implemented.');
}

