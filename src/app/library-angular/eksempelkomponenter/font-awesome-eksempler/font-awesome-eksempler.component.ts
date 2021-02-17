import { Component, Input } from '@angular/core';
import { LibraryExample } from 'src/app/shared/models/library-example.model';

@Component({
  selector: 'app-font-awesome-eksempler',
  templateUrl: './font-awesome-eksempler.component.html'
})
export class FontAwesomeEksemplerComponent {

  @Input() libraryExamples: LibraryExample[];

}
