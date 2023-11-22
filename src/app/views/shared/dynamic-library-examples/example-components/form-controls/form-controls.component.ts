import { Component, Input } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryItemsShared } from '../../../models/library-item.model';
import { MultiselectComponent } from './multiselect/multiselect.component';

@Component({
  selector: 'app-form-controls',
  standalone: true,
  imports: [MultiselectComponent, SharedModule],
  templateUrl: './form-controls.component.html',
})
export class FormControlsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  checked = false;
  tiles = [
    {
      label: 'Ledetekst valg 1',
      description: 'Her er det plass til en liten beskrivelse.',
    },
    {
      label: 'Ledetekst for valg nummer 2',
    },
    {
      label: 'Ledetekst valg 3',
      description: 'Kort beskrivelse.',
    },
  ];

  // Autosuggest
  selectedCarId: number;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
}
