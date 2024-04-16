import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DiagramTypeGroup } from '../../models/diagram-type-group.model';
import { DiagramType } from '../../models/diagram-type.model';

@Component({
  selector: 'fhi-diagram-type-nav-default',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './fhi-diagram-type-nav-default.component.html',
})
export class FhiDiagramTypeNavDefaultComponent {
  @Input() diagramTypeGroups!: DiagramTypeGroup[];

  @Output() diagramTypeNavigation = new EventEmitter<DiagramType>();

  navigate(diagramType: DiagramType) {
    this.diagramTypeNavigation.emit(diagramType);
  }
}
