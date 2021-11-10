import { Component, Input } from '@angular/core';
import { LibraryExample } from 'src/app/shared/models/library-example.model';

@Component({
  selector: 'app-font-awesome-examples',
  templateUrl: './font-awesome-examples.component.html'
})
export class FontAwesomeExamplesComponent {

  @Input() libraryExamples: LibraryExample[];

}
