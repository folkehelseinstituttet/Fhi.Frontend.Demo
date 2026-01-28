export interface MetadataForSerie {
  hasDecimalData?: boolean;
  hasNegativeData?: boolean;
  hasPositiveData?: boolean;
  decimalsIsSet: boolean;
  maxDecimals: number;
  name: string | string[];
}
