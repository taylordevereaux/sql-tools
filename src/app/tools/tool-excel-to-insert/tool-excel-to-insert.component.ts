import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ToolsStore } from '../tools.store';
import { Tools } from '../tools';
import { ExcelParserService } from '@services/excel-parser.service';
import { ThrowStmt } from '@angular/compiler';
import { ToolExcelToInsertStore } from './tool-excel-to-insert.store';
import { InputExcelPasteResult } from '@options/input-excel-paste/input-excel-paste.component';
import { ExcelToInsertOptions, ExcelToInsertColumn, DataType } from './tool-excel-to-insert.state';

@Component({
  selector: 'app-tool-excel-to-insert',
  templateUrl: './tool-excel-to-insert.component.html',
  styleUrls: ['./tool-excel-to-insert.component.scss']
})
export class ExcelToInsertComponent implements OnInit, AfterContentInit {
  public dataTypes: string[] = [];
  public tableName = '';
  public isCreateTableChecked = false;
  
  // The content that's pasted.
  private inputText: string = '';

  public get displayedColumns(): string[] {
    return [
      'columnName',
      'dataType'
    ]
  }

  constructor(
    public store: ToolExcelToInsertStore,
    private toolsStore: ToolsStore,
    private excelParser: ExcelParserService
  ) {
    this.toolsStore.setTool(Tools.ExcelToInsert);
    for (const dt in DataType) {
      if (parseInt(dt, 10) >= 0) {
        this.dataTypes.push(DataType[dt]);
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  // Event Handlers

  public onContentPasted(result: InputExcelPasteResult): void {
    this.inputText = result.content;
    this.store.parseContent(result.content, {
        contentHasHeader: result.contentHasHeader
      } as ExcelToInsertOptions
    );
  }

  public onScriptTableChange(): void {
  }

  public onTableNameChange(): void {
    this.store.setTableName(this.tableName);
  }

}
