import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appExampleAngularComponentHost]',
})
export class AngularComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}