export class InsertScriptOptions {
  trimEntries: boolean;
  skipEmptyRows: boolean;
  tabsAsColumns: boolean;
  singleQuotes: boolean;
  contentHasHeader: boolean;
}

export enum DataType {
  string,
  number,
  date,
  decimal
}
export class ScriptColumn {
  dataType: DataType;
  name: string;
}

export class ScriptRow {
  columns: any[];
  index: number;
}

export class ScriptGenerator {
  // Defaults
  public get insertScriptOptionsDefaults(): InsertScriptOptions {
    return {
      trimEntries: false,
      skipEmptyRows: false,
      tabsAsColumns: true,
      singleQuotes: true,
      contentHasHeader: false
    };
  }
  private insertScriptOptions: InsertScriptOptions = this.insertScriptOptionsDefaults;

  // Output/Render Methods
  private renderOutput: string[] = [];

  // Variables
  public tableName: string;
  public columns: ScriptColumn[];
  public rows: ScriptRow[];

  // Generation Methods
  parseInsertScriptContent(content: string, insertScriptOptions: InsertScriptOptions): void {
    // Get the default options if they were not passed.
    this.insertScriptOptions = {
      ...insertScriptOptions,
      ...this.insertScriptOptionsDefaults
    };
    // The output content that will be displayed to the user.
    const headerRow: string = this.parseInsertScriptHeaderRow(content);

    this.columns = [];

    if (headerRow.length > 0)
    {
      this.columns = this.parseInsertScriptColumns(headerRow);
    }

    this.rows = this.parseInsertScriptRows(content);
  }

  clearOutput(): void {
    this.renderOutput = [];
  }
  renderInsertScript(): void {
    const output: string[] = [];

    const tableName = !!this.tableName ? this.tableName : '#temptable';
    // We start to build the output based on the options provided.
    if (this.insertScriptOptions.contentHasHeader)
    {
      output.push(`
INSERT INTO ${tableName}
(
  ${this.columns.map(x => `[${x.name}],`)}
)
VALUES`);
    }
    else 
    {
      output.push(`
INSERT INTO ${tableName}
VALUES`);
    }

    const quote = this.insertScriptOptions.singleQuotes ? `'` : `"`;

    for (let r = 0; r < this.rows.length; ++r)
    {
      const row = this.rows[r];
      const values = [];
      values.push('(');
      for (let c = 0; c < row.columns.length; ++c)
      {
        switch (this.columns[c].dataType)
        {
          case DataType.decimal:
          case DataType.number:
            values.push(row.columns[c]);
            break;
          case DataType.date:
          case DataType.string:
            values.push(`${quote}${row.columns[c]}${quote}`);
            break;
          default:
            break;
        }

        if (c < row.columns.length) {
          values.push(', ');
        }
      }
      values.push(')');

      if (r < this.rows.length) {
        values.push(',');
      }

      values.push('\n');

      output.push(values.join(''));
    }
  }

  output(): string {
    return this.renderOutput.join('\nGO\n');
  }

  // Parses the collection of rows from the input text.
  private parseInsertScriptHeaderRow(content: string): string {
    // If there is no input we don't need to do anything.
    if (content !== '') {
      // We need to get each new line entry and filter out any blanks.
      let split = content.split('\n');
      if (this.insertScriptOptions.skipEmptyRows) {
        split = split.filter((x) => x.trim() !== '');
      }
      return split.length > 0 ? split[0] : '';
    }
    return '';
  }

  private parseInsertScriptRowColumns(rowData: string[]): any[] {
    return this.columns.map((column, index) => {
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

  private parseInsertScriptRows(content: string): ScriptRow[] {
    // If there is no input we don't need to do anything.
    if (content !== '') {
      // We need to get each new line entry and filter out any blanks.
      let split = content.split('\n');
      if (this.insertScriptOptions.skipEmptyRows) {
        split = split.filter((x) => x.trim() !== '');
      }
      const rows: ScriptRow[] = ScriptRow[split.length];

      for (let i = 0; i < rows.length; ++i) {
        const rowData = split[i].split('\t');
        const row = new ScriptRow();
        row.index = i;
        row.columns = this.parseInsertScriptRowColumns(rowData);
      }
    }
    return [];
  }

  parseInsertScriptColumns(content: string): ScriptColumn[] {
    let split = content.split('\t');

    if (this.insertScriptOptions.trimEntries) {
      split = split.map(x => x.trim());
    }

    return split.map(x => {
      return {
        dataType: DataType.string,
        name: this.insertScriptOptions.contentHasHeader ? x : ''
      } as ScriptColumn;
    });
  }

}
