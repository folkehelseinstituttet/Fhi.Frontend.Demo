import { Component, Input } from '@angular/core';
import { LibraryExample } from 'src/app/shared/models/library-example.model';

@Component({
  selector: 'app-ngb-eksempler',
  templateUrl: './ngb-eksempler.component.html'
})
export class NgbEksemplerComponent {

  @Input() libraryExamples: LibraryExample[];

}
