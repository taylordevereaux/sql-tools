import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { map } from 'rxjs/operators';
import { ToolExcelToInsertState, ExcelToInsertOptions, ExcelToInsertColumn, ExcelToInsertRow, DataType } from './tool-excel-to-insert.state';

@Injectable({
  providedIn: 'root',
})
export class ToolExcelToInsertStore extends Store<ToolExcelToInsertState> {

  constructor() {
    super({
      options: {
        trimEntries: false,
        skipEmptyRows: true,
        tabsAsColumns: true,
        singleQuotes: true,
        contentHasHeader: false
      }
    } as ToolExcelToInsertState);
  }

  setOptions(options: ExcelToInsertOptions): void {
    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        ...options
      }
    });
  }

  setTableName(tableName: string): void {
    this.setState({
      ...this.state,
      tableName
    });
  }

  parseContent(content: string, options: ExcelToInsertOptions = {} as ExcelToInsertOptions): void {
    // Get the default options if they were not passed.
    options = {
      ...this.state.options,
      ...options
    };
    // The output content that will be displayed to the user.
    const headerRow: string = this.parseHeaderRow(content, options);

    let columns: ExcelToInsertColumn[] = [];

    if (headerRow.length > 0)
    {
      columns = this.parseColumns(headerRow, options);
    }

    const rows: ExcelToInsertRow[] = this.parseRows(content, columns, options);

    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        ...options
      },
      rows,
      columns
    });
  }

  //#region Parser

  // Parses the collection of rows from the input text.
  private parseHeaderRow(content: string, options: ExcelToInsertOptions): string {
    // If there is no input we don't need to do anything.
    if (content !== '') {
      // We need to get each new line entry and filter out any blanks.
      let split = content.split('\n');
      if (options.skipEmptyRows) {
        split = split.filter((x) => x.trim() !== '');
      }
      return split.length > 0 ? split[0] : '';
    }
    return '';
  }

  private parseRowColumns(rowData: string[], columns: ExcelToInsertColumn[]): any[] {
    return columns.map((column, index) => {
      if (rowData.length > index) {
        switch (column.dataType) {
          case DataType.string: 
            return rowData[index];
          case DataType.number:
            return parseInt(rowData[index], 10);
          case DataType.decimal:
            return parseFloat(rowData[index]);
          case DataType.date:
            return new Date(rowData[index]);
          default:
            return rowData[index];
        }
      }
      return '';
    });
  }

  private parseRows(content: string, columns: ExcelToInsertColumn[], options: ExcelToInsertOptions): ExcelToInsertRow[] {
    // If there is no input we don't need to do anything.
    if (content !== '') {
      // We need to get each new line entry and filter out any blanks.
      let split = content.split('\n');
      if (options.skipEmptyRows) {
        split = split.filter((x) => x.trim() !== '');
      }
      const rows: ExcelToInsertRow[] = [];

      for (let i = 0; i < split.length; ++i) {
        const rowData = split[i].split('\t');
        const row = {
          index: i,
          columns: this.parseRowColumns(rowData, columns)
        } as ExcelToInsertRow;
        rows.push(row);
      }
      return rows;
    }
    return [];
  }

  private parseColumns(content: string, options: ExcelToInsertOptions): ExcelToInsertColumn[] {
    let split = content.split('\t');

    if (options.trimEntries) {
      split = split.map(x => x.trim());
    }

    return split.map(x => {
      return {
        dataType: DataType.string,
        name: options.contentHasHeader ? x : ''
      } as ExcelToInsertColumn;
    });
  }

  //#endregion
}