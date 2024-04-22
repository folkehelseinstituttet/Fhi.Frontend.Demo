export enum UnitSymbolPosition {
  start,
  end,
}

export const UnitSymbolPositionValues = {
  start: UnitSymbolPosition[UnitSymbolPosition.start],
  end: UnitSymbolPosition[UnitSymbolPosition.end],
};

export interface FhiDiagramUnit {
  decimals?: number;
  label: string;
  symbol?: string;
  position?: keyof typeof UnitSymbolPosition;
}
