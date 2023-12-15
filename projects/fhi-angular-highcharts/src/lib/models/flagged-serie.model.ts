import { FlagWithDataPointName } from './flag-with-data-point-name.model';

export interface FlaggedSerie {
  name: string;
  flaggedDataPoints: Array<FlagWithDataPointName>;
}
