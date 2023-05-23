import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-element-examples',
  templateUrl: './form-element-examples.component.html'
})
export class FormElementExamplesComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

  chkIsOn: boolean = false;

  radioButtonTiles: any = [
    {
      label: 'Ledetekst valg 1',
      description: 'Her er det plass til en liten beskrivelse.'
    },
    {
      label: 'Ledetekst for valg nummer 2'
    },
    {
      label: 'Ledetekst valg 3',
      description: 'Kort beskrivelse.'
    }
  ];
}
