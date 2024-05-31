import { FlaggedSerie } from './flagged-serie.model';

export interface SeriesInfo {
  digitsInfo: string;
  decimalDataPointsExists?: boolean;
  negativeDataPointsExists?: boolean;
  flaggedSeries?: FlaggedSerie[];
}

export interface MetadataForSerie {
  decimals: number;
  digitsInfo?: string;

  // hasDecimalData: boolean;
  // dataIsNegative: boolean;
  // dataIsFlagged: boolean;
  // flag?: string;
}
