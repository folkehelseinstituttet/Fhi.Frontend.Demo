import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-progress-indicators',
  templateUrl: './progress-indicators.component.html',
})
export class ProgressIndicatorsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  inProgress = true;
  valueNow = 0;

  ngOnInit() {
    this.setProgress();
  }

  startProgress() {
    this.valueNow = 0;
    this.inProgress = true;
    setTimeout(() => {
      this.setProgress();
    }, 1000);
  }

  setProgress() {
    setTimeout(() => {
      if (this.valueNow < 100) {
        if (this.inProgress) {
          this.valueNow++;
          this.setProgress();
        }
      } else {
        setTimeout(() => {
          this.inProgress = false;
        }, 500);
      }
    }, 55);
  }
}
