import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  LibraryItemGroup,
  LibraryItemGroupsShared,
  LibraryItemsShared,
} from 'src/app/views/shared/models/library-item.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LibraryItemsDataService {
  private LibraryItemGroupsSharedData_URL = `${environment.apiBaseUrl}/LibraryItemGroupsSharedData`;
  private LibraryItemsSharedData__URL = `${environment.apiBaseUrl}/LibraryItemsSharedData`;

  private _libraryItemGroupsShared!: LibraryItemGroupsShared;
  private _libraryItemsShared!: LibraryItemsShared;

  constructor(private http: HttpClient) {}

  get libraryItemGroupsShared(): LibraryItemGroupsShared {
    return this._libraryItemGroupsShared;
  }
  get libraryItemsShared(): LibraryItemsShared {
    return this._libraryItemsShared;
  }

  getLibraryItemGroupsShared(): Observable<LibraryItemGroupsShared> {
    if (this._libraryItemGroupsShared !== undefined) {
      return of(this._libraryItemGroupsShared);
    }

    return this.http.get<LibraryItemGroupsShared>(this.LibraryItemGroupsSharedData_URL).pipe(
      tap((libraryItemsShared) => (this._libraryItemGroupsShared = libraryItemsShared)),
      catchError((error) => {
        throw error;
      }),
    );
  }

  getLibraryItemsShared(): Observable<LibraryItemsShared> {
    if (this._libraryItemsShared !== undefined) {
      return of(this._libraryItemsShared);
    }
    return this.http.get<LibraryItemsShared>(this.LibraryItemsSharedData__URL).pipe(
      tap((libraryItemsShared) => (this._libraryItemsShared = libraryItemsShared)),
      catchError((error) => {
        throw error;
      }),
    );
  }

  getLibraryItemGroup(
    lastSegmentPath: string,
    libraryItemGroupsShared: LibraryItemGroupsShared,
  ): Observable<LibraryItemGroup> {
    let mockDataSetName: string;

    Object.keys(libraryItemGroupsShared).forEach((key) => {
      if (libraryItemGroupsShared[key].id === lastSegmentPath) {
        mockDataSetName = libraryItemGroupsShared[key].apiEndPoint;
      }
    });
    const serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItemGroup>(serverUrl);
  }
}
