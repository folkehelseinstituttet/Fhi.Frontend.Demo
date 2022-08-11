import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angular-example',
  templateUrl: './angular-example.component.html'
})
export class AngularExampleComponent {

  @Input() exampleTitle: string;

}
