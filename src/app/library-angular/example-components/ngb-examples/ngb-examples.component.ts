import { Component, Input } from '@angular/core';
import { LibraryExample } from 'src/app/shared/models/library-example.model';

@Component({
  selector: 'app-ngb-examples',
  templateUrl: './ngb-examples.component.html'
})
export class NgbExamplesComponent {

  @Input() libraryExamples: LibraryExample[];

}
