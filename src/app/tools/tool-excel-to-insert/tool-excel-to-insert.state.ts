export enum DataType {
  string = 'string',
  number = 'number',
  date = 'date',
  decimal = 'decimal'
}

export interface ExcelToInsertColumn {
  dataType: DataType;
  name: string;
}

export interface ExcelToInsertRow {
  columns: any[];
  index: number;
}

export interface ExcelToInsertOptions {
  trimEntries: boolean;
  skipEmptyRows: boolean;
  tabsAsColumns: boolean;
  singleQuotes: boolean;
  contentHasHeader: boolean;
}

export interface ToolExcelToInsertState {
  options: ExcelToInsertOptions;

  tableName: string;

  rows: ExcelToInsertRow[];
  columns: ExcelToInsertColumn[];

  isTableCreateScripted: boolean;
}
