import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html',
})
export class TabsExampleComponent {
  mainMenuIsOpen = false;

  tabsList: any = [
    {
      tabName: 'Design',
      tabContent: '<p>Innhold for design.</p>',
    },
    {
      icon: 'icon-check',
      tabName: 'Komponenter',
      tabContent: '<p>Innhold for komponenter.</p>',
    },
    {
      tabName: 'Bruk',
      tabContent: '<p>Innhold for bruk.</p>',
    },
    {
      tabName: 'Teknisk dokumentasjon',
      tabContent: '<p>Innhold for teknisk dokumentasjon.</p>',
    },
    {
      tabName: 'Krav',
      tabContent: '<p>Innhold for krav.</p>',
    },
  ];

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }
}
