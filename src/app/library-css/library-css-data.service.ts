import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UrlParamNames } from 'src/app/_common/constants/url-param-names';
import { UrlPaths } from 'src/app/_common/constants/url-paths';
import { LibraryItem } from 'src/app/shared/models/library-item.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryCssDataService {

  constructor(private http: HttpClient) { }

  getLibraryItems(path: string, category?: string): Observable<LibraryItem[]> {
    const mockDataSetName = this.getMockDataSetName(path);
    let serverUrl: string;

    if (category) {
      serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}?${UrlParamNames.komponentCategory}=${category}`;
    } else {
      serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    }
    return this.http.get<LibraryItem[]>(serverUrl);
  }

  private getMockDataSetName(path: string): string {
    switch (path) {
      case UrlPaths.cssLibraryPageTemplates:
        return 'CssSidemalerData';

      case UrlPaths.cssLibraryModules:
        return 'CssModulesData';

      case UrlPaths.cssLibraryComponents:
        return 'CssComponentsData';

      case UrlPaths.cssLibraryUtilityClasses:
        return 'CssHjelpeklasserData';

      case UrlPaths.cssLibraryColorsFonts:
        return 'CssColorsFontsData';

      case UrlPaths.cssLibraryIcons:
        return 'CssIconsData';

      default:
        throw new Error('LibraryCssDataService.getMockDataSetName(): no dataset matches this path: ' + path);
    }
  }

}
