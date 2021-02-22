import { Component, Input } from '@angular/core';
// import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'fhi-btn-shortcut',
  templateUrl: './fhi-btn-shortcut.component.html'
})
export class FhiBtnShortcutComponent {

  @Input() link: string;
  @Input() text: string;

  // faLongArrowRight = faLongArrowRight;
}
