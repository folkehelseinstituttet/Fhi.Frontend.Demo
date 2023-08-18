import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LibraryItemsShared } from 'src/app/views/shared/models/library-item.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryItemsSharedDataService {
  url = `${environment.apiBaseUrl}/LibraryItemsSharedData`;

  private _libraryItemsShared!: LibraryItemsShared;

  constructor(private http: HttpClient) { }

  get libraryItemsShared(): LibraryItemsShared {
    return this._libraryItemsShared;
  }

  getLibraryItemsShared(): Observable<LibraryItemsShared> {
    if (this._libraryItemsShared !== undefined) {
      return of(this._libraryItemsShared);
    }
    return this.http.get<LibraryItemsShared>(this.url).pipe(
      tap(libraryItemsShared => this._libraryItemsShared = libraryItemsShared),
      catchError(error => {
        throw 'Error details: ' + error;
      })
    );
  }

}
