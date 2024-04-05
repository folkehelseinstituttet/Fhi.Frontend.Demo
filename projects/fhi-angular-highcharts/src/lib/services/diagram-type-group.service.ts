import { Injectable } from '@angular/core';

import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups_NEW } from '../constants-and-enums/diagram-type-groups';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DiagramTypeGroupService {
  private diagramTypeGroups!: DiagramTypeGroup[];
  private diagramTypeGroupsSubject = new ReplaySubject<DiagramTypeGroup[]>(1);
  diagramTypeGroups$ = this.diagramTypeGroupsSubject.asObservable();

  getDiagramTypeGroups(): DiagramTypeGroup[] {
    return this.diagramTypeGroups;
  }

  updateDiagramTypeGroups() {
    if (this.diagramTypeGroups !== undefined && this.diagramTypeGroups[0].active) {
      this.diagramTypeGroups[0].active = false;
    } else if (this.diagramTypeGroups !== undefined && !this.diagramTypeGroups[0].active) {
      this.diagramTypeGroups[0].active = true;
    } else {
      this.diagramTypeGroups = DiagramTypeGroups_NEW;
    }
    this.diagramTypeGroupsSubject.next(this.diagramTypeGroups);
  }
}
