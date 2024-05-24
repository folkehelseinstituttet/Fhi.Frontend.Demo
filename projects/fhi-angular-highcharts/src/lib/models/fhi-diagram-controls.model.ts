import { DiagramTypeNavIds } from '../constants-and-enums/diagram-type-nav-ids';
import { ChartTypeIds, MapTypeIds } from '../constants-and-enums/diagram-type-ids';

export interface FhiDiagramControls {
  fullScreenButton?: {
    show: boolean;
  };
  metadataButton?: {
    show: boolean;
  };
  navigation?: {
    items?: {
      chartTypes?: (keyof typeof ChartTypeIds)[];
      mapTypes?: (keyof typeof MapTypeIds)[];
    };
    show: boolean;
    type?: keyof typeof DiagramTypeNavIds;
  };
  tableOrientationButton?: {
    show: boolean;
  };
}
