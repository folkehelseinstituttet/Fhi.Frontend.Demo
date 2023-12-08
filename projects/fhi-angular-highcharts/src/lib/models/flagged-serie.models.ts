import { FlagWithDataPointName } from './flag-With-data-point-name.models';

export interface FlaggedSerie {
  name: string;
  flaggedDataPoints: Array<FlagWithDataPointName>;
}
