import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent {

  @Input() title: string;

}
