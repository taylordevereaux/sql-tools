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
  ${this.columns.map(x => `[${x.name}]`)}
)
VALUES`);
    }
    else 
    {
      output.push(`
INSERT INTO ${tableName}
VALUES`);
    }

    const quoteOption = this.insertScriptOptions.singleQuotes ? `'` : `"`;

    

    // We need to get each new line entry and filter out any blanks.
    const filter = this.parseRows(input);
    // If the filtered version has more than one item we can display the output to the user.
    if (filter.length > 0) {
      // If the treat tabs as column flag is set we need to get the maximum column count.
      var columnCount = tabsAsColumns
        ? this.parseColumnCountFromRows(filter)
        : 1;
      // We now loop through each row entry and append it to the output.
      for (var i = 0; i < filter.length; ++i) {
        var entry = filter[i];
        // If the trim flag is set we need to trim the entry.
        entry = trimEntries ? entry.trim() : entry;
        var item = ['('];
        // We need to loop for each column if the tabColumns flag is set.
        if (tabsAsColumns) {
          var splitEntry = entry.split('\t');
          // loop for the max column count.
          for (let c = 0; c < columnCount; ++c) {
            // We need to use the configured quotes settings.
            let quote = columns[c]?.includeQuotes || true ? `${quoteOption}` : '';
            // If we are not including quotes and the text is empty it needs to be null instead.
            let empty = columns[c]?.includeQuotes || true ? '' : 'NULL';
            // Get the endQuote
            let end = c !== columnCount - 1 ? `${quote}, ` : `${quote}`;
            let content =
              c < splitEntry.length
                ? // If the trim flag is set we trim each column as well.
                  trimEntries
                  ? splitEntry[c].trim()
                  : splitEntry[c]
                : // We need to add an empty entry.
                  empty;
            item.push(`${quote}${content}${end}`);
          }
        } else {
          item.push(`'${entry}'`);
        }
        // We only want to add a comma if we aren't the last entry.
        item.push(i !== filter.length - 1 ? '),' : ')');
        // Join the items array into a string.
        output.push(item.join(''));
      }
      //console.log(output);
    }
    // We now set the output pre control to the content we generated.
    return output.join('\n');
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
