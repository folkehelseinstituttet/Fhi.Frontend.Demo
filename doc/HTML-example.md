# HTML example

This HTML example is an Angular template. It shows the spacing we use and how break linkes for attribures etc. in our projects.

```html
<div class="container">
  <div class="row">
    <div class="col-xl-3 col-xxl-3">
      <app-something [input]="input"></app-something>
    </div>
    <div class="col-xl-9 col-xxl-7" *ngIf="x else template">
      <app-something 
        [input]="input"
        [input2]="input2"
        [input3]="input3"
        [input4]="input4">
      </app-something>
    </div>
</div>


<ng-template #template>
  <div class="col-xl-9 col-xxl-7" *ngIf="x else template">
    <div class="foo"
         [directive]="'value'"
         [directive2]="'value'"
         [directive2]="'value'">
      <div class="foo"></div>
    </div>
  </div>
</ng-template>
```
