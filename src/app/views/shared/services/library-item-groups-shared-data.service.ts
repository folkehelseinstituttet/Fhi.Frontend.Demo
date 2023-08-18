import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LibraryItemGroupsShared } from 'src/app/views/shared/models/library-item.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryItemGroupsSharedDataService {
  _libraryItemGroupsShared!: LibraryItemGroupsShared;
  url = `${environment.apiBaseUrl}/LibraryItemGroupsSharedData`;

  constructor(private http: HttpClient) { }

  get libraryItemsShared(): LibraryItemGroupsShared {
    return this._libraryItemGroupsShared;
  }

  getLibraryItemGroupsShared(): Observable<LibraryItemGroupsShared> {
    if (this._libraryItemGroupsShared !== undefined) {
      return of(this._libraryItemGroupsShared);
    }
    return this.http.get<LibraryItemGroupsShared>(this.url).pipe(
      tap(libraryItemsShared => this._libraryItemGroupsShared = libraryItemsShared),
      catchError(error => {
        throw 'Error details: ' + error;
      })
    );
  }

}
