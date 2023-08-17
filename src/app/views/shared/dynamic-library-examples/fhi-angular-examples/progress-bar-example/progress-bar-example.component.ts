import { Component } from '@angular/core';

@Component ({
  selector: 'app-progress-bar-example',
  templateUrl: './progress-bar-example.component.html'
})
export class ProgressBarExampleComponent {
  inProgress: boolean = true;
  valueNow: number = 0;

  ngOnInit() {
    this.setProgress();
  }

  setProgress() {
    setTimeout(() => {
      console.log('hoi!');
      if (this.valueNow < 100) {
        if (this.inProgress) {
          this.valueNow ++;
          this.setProgress();
        }
      } else {
        setTimeout(() => {
          this.resetProsess();
        }, 2000);
      }
    }, 55);
  }

  resetProsess() {
    this.inProgress = false;
    this.valueNow = 0;
    setTimeout(() => {
      this.setProgress();
    }, 2000);
  }
}
