import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngb-accordion',
  templateUrl: './ngb-accordion.component.html'
})
export class NgbAccordionComponent implements OnInit {

  code = `<ngb-accordion #acc="ngbAccordion" activeIds="ngb-panel-0">
  <ngb-panel title="Item #1">
    <ng-template ngbPanelContent>
      <p>Item #1 content</p>
    </ng-template>
  </ngb-panel>
  <ngb-panel title="Item #2">
    <ng-template ngbPanelContent>
      <p>Item #2 content</p>
    </ng-template>
  </ngb-panel>
  <ngb-panel title="Item #3">
    <ng-template ngbPanelContent>
      <p>Item #3 content</p>
    </ng-template>
  </ngb-panel>
</ngb-accordion>`;

  constructor() { }

  ngOnInit(): void { }

}
