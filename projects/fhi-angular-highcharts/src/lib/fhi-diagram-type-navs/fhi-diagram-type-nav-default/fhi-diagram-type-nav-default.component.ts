import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DiagramTypeGroupService } from '../../services/diagram-type-group.service';
import { DiagramTypeGroup } from '../../models/diagram-type-group.model';
import { DiagramType } from '../../models/diagram-type.model';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fhi-diagram-type-nav-default',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './fhi-diagram-type-nav-default.component.html',
})
export class FhiDiagramTypeNavDefaultComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  currentActiveDiagramType: DiagramType;

  @Output() diagramTypeNavigation = new EventEmitter<DiagramType>();

  diagramTypeGroups!: DiagramTypeGroup[];

  constructor(private diagramTypeGroupService: DiagramTypeGroupService) {}

  ngOnInit() {
    this.subscription.add(
      this.diagramTypeGroupService.diagramTypeGroups$.subscribe({
        next: (diagramTypeGroups) => {
          this.diagramTypeGroups = diagramTypeGroups;
          this.currentActiveDiagramType = this.findCurrentActiveDiagramType(diagramTypeGroups);
        },
        error: (error) => console.log(error),
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigate(diagramType: DiagramType) {
    this.currentActiveDiagramType.active = false;
    diagramType.active = true;
    this.diagramTypeNavigation.emit(diagramType);
    this.currentActiveDiagramType = diagramType;
  }

  findCurrentActiveDiagramType(diagramTypeGroup: DiagramTypeGroup[]) {
    // console.log('find diagram type group', diagramTypeGroup);
    for (let i = 0; i < diagramTypeGroup.length; i++) {
      if (diagramTypeGroup[i].diagramType.active === true) {
        return diagramTypeGroup[i].diagramType;
      }
    }
  }
}
