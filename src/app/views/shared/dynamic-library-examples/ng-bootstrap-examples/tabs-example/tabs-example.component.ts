import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html'
})
export class TabsExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  tabsList: any = [
    {
      tabName: 'Design',
      tabContent: '<p>Innhold for design.</p>'
    },
    {
      tabName: 'Komponenter',
      tabContent: '<p>Innhold for komponenter.</p>'
    },
    {
      tabName: 'Bruk',
      tabContent: '<p>Innhold for bruk.</p>'
    },
    {
      tabName: 'Teknisk dokumentasjon',
      tabContent: '<p>Innhold for teknisk dokumentasjon.</p>'
    },
    {
      tabName: 'Krav',
      tabContent: '<p>Innhold for krav.</p>'
    }
  ];

  active = 1;
}
