import { DiagramTypeNavIds } from '../constants-and-enums/diagram-type-nav-ids';
import { MapTypeIds } from '../constants-and-enums/diagram-type-ids';

export interface FhiDiagramControls {
  metadataButton?: {
    show: boolean;
  };
  navigation?: {
    items: {
      //chartTypes?: keyof (typeof ChartTypeIds)[];
      mapTypes?: keyof (typeof MapTypeIds)[];
    };
    show?: boolean;
    type?: keyof typeof DiagramTypeNavIds;
  };
  showFullScreenButton?: {
    show: boolean;
  };
  tableOrientationButton?: {
    show: boolean;
  };
}
