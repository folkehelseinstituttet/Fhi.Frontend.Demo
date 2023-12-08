import { FhiDiagramFlag } from './fhi-diagram-flag.models';

export interface FlagWithDataPointName extends FhiDiagramFlag {
  name: string;
}
