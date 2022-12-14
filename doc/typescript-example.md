# TypeScript example

This TypeScript example is an Angular component. It shows the order and the spacing we use in our projects.

```ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoreThirdParyStuff } from '@morethirdpary/stuff';

import { LocalStuff } from '@local/stuff';

@Component({
  selector: 'app-something',
  templateUrl: './something.component.html'
})
export class SomethingComponent implements OnInit {

  @Input() foo: string = 'foo';

  @Output() bar = new EventEmitter();

  publicProperty = 'some value';

  private property!: string;

  constructor() { }

  ngOnInit() {
  }

  publicMethod() {
  }

  private method() {
  }

}
```
