export interface MetadataForSerie {
  name: string | string[];
  hasDecimalData?: boolean;
  hasNegativeData?: boolean;
  hasPositiveData?: boolean;
  maxDecimals: number;
}
