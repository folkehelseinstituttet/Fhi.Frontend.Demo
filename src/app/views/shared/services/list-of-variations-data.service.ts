import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListOfVariationsDataService {

  constructor(private http: HttpClient) { }

  getLibraryItems(lastSegmentPath: string): Observable<LibraryItem[]> {
    const mockDataSetName = this.capitalizeFirstLetter(lastSegmentPath) + 'Data';
    let serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItem[]>(serverUrl);
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
