import { FlaggedSerie } from './flagged-serie.model';

export interface SeriesInfo {
  digitsInfo: string;
  decimalDataPointsExists?: boolean;
  negativeDataPointsExists?: boolean;
  flaggedSeries?: FlaggedSerie[];
}

export interface MetadataForSerie {
  decimals: number;
  hasDecimalData?: boolean;
  hasNegativeData?: boolean;
  // dataIsFlagged: boolean;
  // flag?: string;
}
