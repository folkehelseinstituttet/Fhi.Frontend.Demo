import { DiagramTypeIds } from '../constants-and-enums/diagram-type-ids';
import { DiagramTypeNavIds } from '../constants-and-enums/diagram-type-nav-ids';
import { MapTypeIds } from '../constants-and-enums/diagram-type-ids';
import { TableOrientations } from '../constants-and-enums/table-orientations';
import { FhiDiagramFlag } from './fhi-diagram-flag.model';
import { FhiDiagramSerie } from './fhi-diagram-serie.model';
import { FhiDiagramUnit } from './fhi-diagram-unit.model';

export type FhiDiagramTypeIds = keyof typeof DiagramTypeIds;
export type FhiTableOrientations = keyof typeof TableOrientations;

export interface FhiDiagramOptions {
  // activeDiagramType: FhiDiagramTypeIds;
  // controls?: FhiDiagramControls;;
  // footer?: FhiDiagramFooter;
  openSource?: boolean;
  series: FhiDiagramSerie[];
  tableOrientation?: FhiTableOrientations;
  title: string;
  unit?: FhiDiagramUnit[];

  // TODO: make a tmp solution for converting
  //   diagramTypeId === 'map' to diagramTypeId === [mapTypeId]
  //   to avoid breaking change in PR for issue:
  //   https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/issues/540

  // FhiDiagramOptions.mapTypeId will be deprecated in v4
  mapTypeId?: keyof typeof MapTypeIds;

  // The following will be deprecated in v5
  creditsHref?: string;
  creditsText?: string;
  decimals?: number;
  diagramTypeId?: FhiDiagramTypeIds;
  diagramTypeNavId?: keyof typeof DiagramTypeNavIds;
  diagramTypeSubset?: FhiDiagramTypeIds[];
  disclaimer?: string;
  flags?: FhiDiagramFlag[];
  lastUpdated?: string;
  metadataButton?: boolean;
  showFullScreenButton?: boolean;
}

// export interface FhiDiagramOptions {
//   activeDiagramType: FhiDiagramTypeIds;
//   controls?: {
//     fullScreenButton?: {
//       show?: boolean;
//     };
//     metadataButton?: {
//       show?: boolean;
//     };
//     navigation?: {
//       items?: {
//         chartTypes?: Array<keyof typeof ChartTypeIds>;
//         mapTypes?: Array<keyof typeof MapTypeIds>;
//       };
//       show?: boolean;
//       type?: keyof typeof DiagramTypeNavIds;
//     };
//     tableOrientationButton?: {
//       show?: boolean;
//     };
//   };
//   footer?: {
//     credits?: {
//       href: string;
//       text: string;
//     };
//     disclaimer?: string;
//     flags?: Array<FhiDiagramFlag>;
//     lastUpdated?: string;
//   };
//   openSource?: boolean;
//   series: [
//     {
//       data: {
//         name: string;
//         y: number | string;
//       };
//       name: string | Array<string>;
//       stack?: string;
//       unitId?: number | string;
//     },
//   ];
//   tableOrientation?: FhiTableOrientations;
//   title: string;
//   unit?: [
//     {
//       id: number | string;
//       decimals: number;
//       label: string;
//       symbol: string;
//       position: keyof typeof UnitSymbolPosition;
//     },
//   ];
// }
