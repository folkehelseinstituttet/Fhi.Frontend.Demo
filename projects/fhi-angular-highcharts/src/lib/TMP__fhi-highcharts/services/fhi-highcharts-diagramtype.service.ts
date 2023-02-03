import { Injectable } from '@angular/core';

import { DiagramtypeId } from '../fhi-highcharts-diagramtype-id';
import { Diagramtype, Diagramtyper } from '../fhi-highcharts-diagramtyper';

@Injectable({
  providedIn: 'root'
})
export class FhiHighchartsDiagramtypeService {

  constructor() {
    this.setDiagramtypeList();
  }

  private diagramtypeList: Diagramtype[];
  private urlParamValue: string;

  getDiagramtypeList(): Diagramtype[] {
    return this.diagramtypeList;
  }

  getActiveDiagramtype(): Diagramtype {
    return this.diagramtypeList.find(diagramtype => diagramtype.isActive);
  }

  getActiveDiagramtypeId(): string {
    return this.getActiveDiagramtype()?.id;
  }

  setDiagramtypeUrlParamValue(urlParamValue: string) {
    this.urlParamValue = urlParamValue;
  }

  prepareDiagramtyperAfterLoadingNewData(defaultDiagramtype: Diagramtype, diagramtyperDisabledList: Diagramtype[]) {
    this.addDisabledToDiagramtype(diagramtyperDisabledList);
    this.updateActiveDiagramtype(this.findActiveDiagramtype(defaultDiagramtype));
  }

  updateActiveDiagramtype(activeDiagramtype: Diagramtype) {
    this.diagramtypeList.forEach(diagramtype => {
      if (diagramtype === activeDiagramtype) {
        diagramtype.isActive = true;
      } else {
        diagramtype.isActive = false;
      }
    });
  }

  private addDisabledToDiagramtype(diagramtypeDisabledList: Diagramtype[]) {
    this.diagramtypeList.forEach(diagramtype => {
      diagramtype.isDisabled = false;

      diagramtypeDisabledList.forEach(diagramtypeDisabled => {
        if (diagramtype.id === diagramtypeDisabled.id) {
          diagramtype.isDisabled = true;
        }
      });
    });
  }

  private findActiveDiagramtype(defaultDiagramtype: Diagramtype): Diagramtype {
    const diagramtypeFromUrl = this.urlParamValue !== undefined && this.urlParamValue.length > 0;
    const diagramtypeFromUrlOk = this.isDiagramtypeFromUrlOk();

    if (diagramtypeFromUrl && diagramtypeFromUrlOk) {
      return this.diagramtypeList.find(diagramtype => diagramtype.urlParamValue === this.urlParamValue);
    } else if (!diagramtypeFromUrl || !diagramtypeFromUrlOk) {
      return defaultDiagramtype;
    } else {
      return this.diagramtypeList.find(diagramtype => diagramtype.id === DiagramtypeId.table);
    }
  }

  private isDiagramtypeFromUrlOk(): boolean {
    let urlParamValueMatch: boolean;
    let isDisabled: boolean;
    let isOk = false;

    this.diagramtypeList.forEach(diagramtype => {
      urlParamValueMatch = diagramtype.urlParamValue === this.urlParamValue;
      isDisabled = diagramtype.isDisabled;
      if (urlParamValueMatch && !isDisabled) {
        isOk = true;
      }
    });
    return isOk;
  }

  private setDiagramtypeList() {
    this.diagramtypeList = [
      Diagramtyper.table,
      Diagramtyper.line,
      Diagramtyper.column,
      Diagramtyper.bar,
      Diagramtyper.columnStacked,
      Diagramtyper.barStacked,
      Diagramtyper.mapFylker
    ];
  }

}
