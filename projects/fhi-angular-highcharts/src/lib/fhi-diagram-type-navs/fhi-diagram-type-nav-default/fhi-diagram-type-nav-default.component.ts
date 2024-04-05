import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DiagramTypeGroupService } from '../../services/diagram-type-group.service';
import { DiagramTypeGroup } from '../../models/diagram-type-group.model';

@Component({
  selector: 'fhi-diagram-type-nav-default',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fhi-diagram-type-nav-default.component.html',
})
export class FhiDiagramTypeNavDefaultComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  diagramTypeGroups!: DiagramTypeGroup[];

  constructor(private diagramTypeGroupService: DiagramTypeGroupService) {}

  ngOnInit() {
    this.subscription.add(
      this.diagramTypeGroupService.diagramTypeGroups$.subscribe({
        next: (diagramTypeGroups) => {
          this.diagramTypeGroups = diagramTypeGroups;
        },
        error: (error) => console.log(error),
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
