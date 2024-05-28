import { FlaggedSerie } from './flagged-serie.model';

export interface SeriesInfo {
  digitsInfo: string;
  decimalDataPointsExists?: boolean;
  negativeDataPointsExists?: boolean;
  flaggedSeries?: FlaggedSerie[];
}
