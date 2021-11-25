import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UrlParamNames } from 'src/app/_common/constants/url-param-names';
import { UrlPaths } from 'src/app/_common/constants/url-paths';
import { LibraryExample } from 'src/app/shared/models/library-example.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultExamplesDataService {

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

  public getTypeScriptFile(folderName: string){
    const filePath = `${environment.fhiAngularComponentsRootFolder}/${folderName}/${folderName}.component.ts`;
    return this.readFile(filePath)
  }

  public getHtmlFile(folderName: string){
    const filePath = `${environment.fhiAngularComponentsRootFolder}/${folderName}/${folderName}.component.html`;
    return this.readFile(filePath);
  }

  private getMockDataSetName(path: string): string {
    switch (path) {

      case UrlPaths.angularBibliotekSharedComponents:
        return 'AngularSharedComponentsData';

      default:
        throw new Error('DefaultExamplesDataService.getMockDataSetName(): no dataset matches this path.');
    }
  }

  private readFile(filePath: string){
    return this.http.get(filePath, {observe: 'body', responseType: 'text'});
  }
}
