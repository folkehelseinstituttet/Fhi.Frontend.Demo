import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedDataService } from './library-item-groups-shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class LibraryItemGroupsDataService {
  constructor(
    private http: HttpClient,
    private libraryItemGroupsSharedDataService: LibraryItemGroupsSharedDataService,
  ) {}

  getLibraryItemGroup(lastSegmentPath: string): Observable<LibraryItemGroup> {
    const libraryItemGroupsShared = this.libraryItemGroupsSharedDataService.libraryItemGroupsShared;
    let mockDataSetName: string;

    Object.keys(libraryItemGroupsShared).forEach((key) => {
      if (libraryItemGroupsShared[key].id === lastSegmentPath) {
        mockDataSetName = libraryItemGroupsShared[key].apiEndPoint;
      }
    });
    const serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItemGroup>(serverUrl);
  }

  // TODO: remove these 3 metods when all lib-items use getLibraryItemGroup()

  getLibraryItems(lastSegmentPath: string): Observable<LibraryItem[]> {
    const mockDataSetName = this.capitalizeFirstLetter(lastSegmentPath) + 'Data';
    const serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItem[]>(serverUrl);
  }

  getLibraryItemIds(): Observable<any> {
    const serverUrl = `${environment.apiBaseUrl}/LibraryItemIds`;
    return this.http.get<any>(serverUrl);
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
