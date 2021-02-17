import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UrlParamNames } from 'src/app/_felles/konstanter/url-param-names';
import { UrlPaths } from 'src/app/_felles/konstanter/url-paths';
import { LibraryExample } from 'src/app/shared/models/library-example.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryCssDataService {

  constructor(private http: HttpClient) { }

  getLibraryExamples(path: string, category?: string): Observable<LibraryExample[]> {
    const mockDataSetName = this.getMockDataSetName(path);
    let serverUrl: string;

    if (category) {
      serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}?${UrlParamNames.komponentCategory}=${category}`;
    } else {
      serverUrl = `${environment.apiBaseUrl}/${mockDataSetName}`;
    }
    return this.http.get<LibraryExample[]>(serverUrl);
  }

  private getMockDataSetName(path: string): string {
    switch (path) {
      case UrlPaths.cssBibliotekSidemaler:
        return 'CssSidemalerData';

      case UrlPaths.cssBibliotekModuler:
        return 'CssModulerData';

      case UrlPaths.cssBibliotekKomponenter:
        return 'CssKomponenterData';

      case UrlPaths.cssBibliotekHjelpeklasser:
        return 'CssHjelpeklasserData';

      case UrlPaths.cssBibliotekFargerSkrift:
        return 'CssFargerSkriftData';

      case UrlPaths.cssBibliotekIkoner:
        return 'CssIkonerData';

      default:
        throw new Error('LibraryCssDataService.getMockDataSetName(): no dataset matches this path: ' + path);
    }
  }

}
