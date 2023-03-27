import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';


@Component({
  selector: 'fhi-diagram-type-nav',
  templateUrl: './fhi-diagram-type-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiDiagramTypeNavComponent {
  FhiDiagramTypes = FhiDiagramTypes;

  @Input() currentDiagramTypeGroup!: string;
  @Input() diagramType!: FhiDiagramType;
  @Output() diagramTypeNav = new EventEmitter<FhiDiagramType>();



  // TODO:
  //   - Transfer all values to FhiDiagramTypes.
  //   - Create logic for navigation based on real values
  //   - Create logic for subset (only include what consumer want).
  //   - Create logic for language (NO/EN)
  chartIsActive: boolean;
  navMenu = [
    { name: 'Tabell', icon: 'table' },
    { name: 'Kart', icon: 'geo-alt' },
    {
      name: 'Graf',
      icon: null,
      hasChartTypes: true,
      chartTypes: [
        'Linjediagram',
        'Stående søylediagram',
        'Liggende søylediagram',
        'Stående søylediagram stablet',
        'Liggende søylediagram stablet',
        // 'Kakediagram'
      ]
    }
  ];
  chartTypes = [
    { name: 'Linjediagram', icon: 'graph-up' },
    { name: 'Stående søylediagram', icon: 'bar-chart-line' },
    { name: 'Liggende søylediagram', icon: 'bar-chart-line-horizontal' },
    { name: 'Stående søylediagram stablet', icon: 'bar-chart-line-stacked' },
    { name: 'Liggende søylediagram stablet', icon: 'bar-chart-line-stacked-horizontal' },
    // { name: 'Kakediagram', icon: 'pie-chart' },
  ];
  currentChartType: string = 'bar-chart-line';

  changeChartType(icon: string) {
    if (icon !== 'table') {
      this.currentChartType = icon;
    }

    // TMP hack to make navigation work
    let diagramType: FhiDiagramType;
    switch (icon) {
      case 'table':
        diagramType = FhiDiagramTypes.table;
        break;
      case 'geo-alt':
        diagramType = FhiDiagramTypes.mapFylker;
        break;
      case 'graph-up':
        diagramType = FhiDiagramTypes.line;
        break;
      case 'bar-chart-line':
        diagramType = FhiDiagramTypes.column;
        break;
      case 'bar-chart-line-horizontal':
        diagramType = FhiDiagramTypes.bar;
        break;
      case 'bar-chart-line-stacked':
        diagramType = FhiDiagramTypes.columnStacked;
        break;
      case 'bar-chart-line-stacked-horizontal':
        diagramType = FhiDiagramTypes.barStacked;
        break;
      default:
        diagramType = FhiDiagramTypes.table;
    }
    this.navigateToDiagramType(diagramType);
  }





  ngOnChanges() {
    // console.log('ngOnChanges() -> diagramType', this.diagramType);
  }

  navigateToDiagramType(diagramType: FhiDiagramType) {
    // console.log('navigateToDiagramType() -> diagramType', diagramType);
    this.diagramTypeNav.emit(diagramType);
  }

}
