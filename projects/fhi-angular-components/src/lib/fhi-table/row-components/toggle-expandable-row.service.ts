import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleExpandableRowService {
  private tableRowIsExpandedSubject = new Subject<boolean>();
  tableRowIsExpanded$ = this.tableRowIsExpandedSubject.asObservable();
  index!: number;

  open(index: number) {
    this.index = index;
    this.tableRowIsExpandedSubject.next(true);
  }
  close(index: number) {
    this.index = index;
    this.tableRowIsExpandedSubject.next(false);
  }
}
