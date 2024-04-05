import { Injectable } from '@angular/core';

import { DiagramTypeGroup } from '../models/diagram-type-group.model';
import { DiagramTypeGroups_NEW } from '../constants-and-enums/diagram-type-groups';

@Injectable()
export class DiagramTypeGroupService {
  private diagramTypeGroups!: DiagramTypeGroup[];

  getDiagramTypeGroups(): DiagramTypeGroup[] {
    return this.diagramTypeGroups;
  }

  updateDiagramTypeGroups() {
    this.diagramTypeGroups = DiagramTypeGroups_NEW;
  }
}
