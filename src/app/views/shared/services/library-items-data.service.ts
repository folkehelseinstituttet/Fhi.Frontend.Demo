import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LibraryItem, LibraryItemGroup, LibraryItemsShared } from 'src/app/views/shared/models/library-item.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryItemsDataService {

  constructor(private http: HttpClient) { }

  getLibraryItems(lastSegmentPath: string): Observable<LibraryItem[]> {
    const mockDataSetName = this.capitalizeFirstLetter(lastSegmentPath) + 'Data';
    let serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItem[]>(serverUrl);
  }

  getLibraryItemGroup(lastSegmentPath: string): Observable<LibraryItemGroup> {

    const mockDataSetName = this.capitalizeFirstLetter(lastSegmentPath) + 'GroupData';

    let serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItemGroup>(serverUrl);
  }

  getLibraryItemIds(): Observable<any> {
    let serverUrl = `${environment.apiBaseUrl}/LibraryItemIds`;
    return this.http.get<any>(serverUrl);
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
