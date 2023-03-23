import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups, FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';


@Component({
  selector: 'fhi-diagram-type-navigation',
  templateUrl: './fhi-diagram-type-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiDiagramTypeNavigationComponent {
  FhiDiagramTypes = FhiDiagramTypes;

  @Input() currentDiagramTypeGroup!: string;
  @Input() diagramType!: FhiDiagramType;
  @Output() diagramTypeNavigation = new EventEmitter<FhiDiagramType>();

  ngOnChanges() {
    console.log('diagramTemplates', FhiDiagramTypeGroups.chart);
  }

  navigateToDiagramType(diagramType: FhiDiagramType) {
    this.diagramTypeNavigation.emit(diagramType);
  }

}
