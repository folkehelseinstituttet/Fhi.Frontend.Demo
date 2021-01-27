import { Component, Input } from '@angular/core';

import { LibraryExample } from '../../shared/models/library-example.model';
import { LibraryExampleFilter } from '../../shared/models/library-example-filter.model';

@Component({
  selector: 'app-library-example-list-dynamic',
  templateUrl: './library-example-list-dynamic.component.html'
})
export class LibraryExampleListDynamicComponent {

  @Input() libraryExamples: LibraryExample[];

  libraryExampleFilter: LibraryExampleFilter = { title: '' };
}
