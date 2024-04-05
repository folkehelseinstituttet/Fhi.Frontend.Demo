import { Injectable } from '@angular/core';

import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups_NEW } from '../constants-and-enums/diagram-type-groups';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DiagramTypeGroupService {
  // TODO: The premise for the new diagramTypeGroups is that "map types" is implementend the same
  //       way as "chart types", ie. that FhiDiagramOptions.mapTypeId is deprecated, and diferent
  //       maps has it own type in DiagramTypes, not just one type with id "map" as is the case today.
  private diagramTypeGroups = DiagramTypeGroups_NEW;
  private diagramTypeGroupsSubject = new ReplaySubject<DiagramTypeGroup[]>(1);
  diagramTypeGroups$ = this.diagramTypeGroupsSubject.asObservable();

  getDiagramTypeGroups(): DiagramTypeGroup[] {
    return this.diagramTypeGroups;
  }

  updateDiagramTypeGroups() {
    this.diagramTypeGroupsSubject.next(this.diagramTypeGroups);
  }

  updateDiagramTypeGroups__DUMMY() {
    if (this.diagramTypeGroups[0].active) {
      this.diagramTypeGroups[0].active = false;
    } else if (!this.diagramTypeGroups[0].active) {
      this.diagramTypeGroups[0].active = true;
    }
    this.diagramTypeGroupsSubject.next(this.diagramTypeGroups);
  }
}
