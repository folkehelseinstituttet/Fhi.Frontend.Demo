import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UrlPaths } from 'src/app/url-paths';
import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperDataService {

  constructor(private http: HttpClient) { }

  getLibraryItems(path: string): Observable<LibraryItem[]> {
    const mockDataSetName = this.getMockDataSetName(path);
    let serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    return this.http.get<LibraryItem[]>(serverUrl);
  }

  private getMockDataSetName(path: string): string {
    switch (path) {
      // case UrlPaths.pageTemplates:
      //   return 'CssSidemalerData';

      // case UrlPaths.modules:
      //   return 'CssModulesData';

      case UrlPaths.components:
        return 'CssComponentsData';

      // case UrlPaths.utilities:
      //   return 'CssHjelpeklasserData';

      case UrlPaths.colorsAndFonts:
        return 'CssColorsFontsData';

      case UrlPaths.icons:
        return 'CssIconsData';

      default:
        throw new Error('LibraryCssDataService.getMockDataSetName(): no dataset matches this path: ' + path);
    }
  }

}
