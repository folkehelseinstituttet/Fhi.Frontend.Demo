export interface MetadataForSerie {
  hasDecimalData?: boolean;
  hasNegativeData?: boolean;
  hasPositiveData?: boolean;
  decimalsIsSetInUnitOptions: boolean;
  maxDecimals: number;
  name: string | string[];
}
