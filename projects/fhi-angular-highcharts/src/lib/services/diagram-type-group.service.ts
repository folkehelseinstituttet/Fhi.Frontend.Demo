import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups_NEW } from '../constants-and-enums/diagram-type-groups';
import { FhiDiagramSerie } from '../models/fhi-diagram-serie.model';
import { FlaggedSerie } from '../models/flagged-serie.model';
import { DiagramType } from '../models/diagram-type.model';

@Injectable()
export class DiagramTypeGroupService {
  // TODO: The premise for the new diagramTypeGroups is that "map types" is implementend the same
  //       way as "chart types", ie. that FhiDiagramOptions.mapTypeId is deprecated, and diferent
  //       maps has it own type in DiagramTypes, not just one type with id "map" as is the case today.
  private diagramTypeGroups = DiagramTypeGroups_NEW;
  private diagramTypeSubset!: string[] | undefined;
  private flaggedSeries!: FlaggedSerie[];
  private series!: FhiDiagramSerie[];
  private diagramTypeGroupsSubject = new ReplaySubject<DiagramTypeGroup[]>(1);
  diagramTypeGroups$ = this.diagramTypeGroupsSubject.asObservable();

  getDiagramTypeGroups(): DiagramTypeGroup[] {
    return this.diagramTypeGroups;
  }

  updateDiagramTypeGroups(
    diagramTypeSubset: string[] | undefined,
    flaggedSeries: FlaggedSerie[],
    series: FhiDiagramSerie[],
  ) {
    this.diagramTypeSubset = diagramTypeSubset;
    this.flaggedSeries = flaggedSeries;
    this.series = series;

    this.diagramTypeGroups.forEach((group) => {
      // TODO: remove types not in subset here...
      group.children.forEach((diagramType) => {
        this.disableDiagramType(diagramType);
        this.setDiagramTypeToActive(diagramType);
      });
    });

    this.diagramTypeGroupsSubject.next(this.diagramTypeGroups);
  }

  private setDiagramTypeToActive(diagramType: DiagramType) {
    if (diagramType.id === 'table') {
      diagramType.active = true;
    }
  }

  private disableDiagramType(diagramType: DiagramType) {
    // const numOfDataPointsPrSerie = this.getNumberOfDataPointsPrSerie();

    // Add line
    // if (
    //   numOfDataPointsPrSerie === 1 ||
    //   (this.series.length > 1 && this.flaggedSeries.length !== 0)
    // ) {
    // }

    if (diagramType.id === 'line') {
      diagramType.disabled = true;
    }
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series have the same length.
    return this.series[0].data.length;
  }
}
