export interface TableCell {
  isHeading: boolean;
  data?: string | number;
  name?: string | undefined;
  colspan?: number;
  rowspan?: number;
}

export interface TableData {
  theadRows: TableCell[][];
  tbodyRows: TableCell[][];
}
