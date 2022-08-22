import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MenuItem } from 'src/app/models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class LibrarySecondLevelMenuDataService {

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<MenuItem[]> {
    let serverUrl = `${environment.apiBaseUrl}/LibrarySecondLevelMenuData`;
    return this.http.get<MenuItem[]>(serverUrl);
  }

}
