import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { DiagramTypeIdValues } from '../constants-and-enums/diagram-type-ids';
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
    this.flaggedSeries = flaggedSeries;
    this.series = series;

    this.diagramTypeGroups.forEach((group) => {
      if (diagramTypeSubset !== undefined && group.diagramType.id !== DiagramTypeIdValues.table) {
        this.removeDiagramTypesNotInSubset(group, diagramTypeSubset);
      }
      group.children.forEach((diagramType) => {
        this.disableDiagramType(diagramType);
        this.setDiagramTypeToActive(diagramType);
      });
    });

    this.diagramTypeGroupsSubject.next(this.diagramTypeGroups);
  }

  private removeDiagramTypesNotInSubset(group: DiagramTypeGroup, diagramTypeSubset: string[]) {
    group.children = group.children.filter((type) => diagramTypeSubset.includes(type.id));
    group.diagramType = group.children[0];
  }

  private setDiagramTypeToActive(diagramType: DiagramType) {
    if (diagramType.id === 'table') {
      diagramType.active = true;
    }
  }

  private disableDiagramType(diagramType: DiagramType) {
    switch (diagramType.id) {
      case DiagramTypeIdValues.line:
        diagramType.disabled = this.disableDiagramTypeLine();
        break;

      case DiagramTypeIdValues.pie:
        diagramType.disabled = this.disableDiagramTypePie();
        break;

      case DiagramTypeIdValues.map:
        diagramType.disabled = this.disableDiagramTypeMap();
        break;

      default:
        diagramType.disabled = false;
    }
  }

  private disableDiagramTypeMap(): boolean {
    return this.series.length > 1;
  }

  private disableDiagramTypeLine(): boolean {
    return (
      this.getNumberOfDataPointsPrSerie() === 1 ||
      (this.series.length > 1 && this.flaggedSeries.length !== 0)
    );
  }

  private disableDiagramTypePie(): boolean {
    return this.series.length > 1;
  }

  private getNumberOfDataPointsPrSerie(): number {
    // Using series[0] since all series should have the same length.
    return this.series[0].data.length;
  }
}
