import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ToolsStore } from '../tools.store';
import { Tools } from '../tools';
import { ExcelParserService } from '@services/excel-parser.service';
import { ThrowStmt } from '@angular/compiler';
import { ToolExcelToInsertStore } from './tool-excel-to-insert.store';

@Component({
  selector: 'app-tool-excel-to-insert',
  templateUrl: './tool-excel-to-insert.component.html',
  styleUrls: ['./tool-excel-to-insert.component.scss']
})
export class ExcelToInsertComponent implements OnInit, AfterContentInit {
  public tableName: string = '';
  public isCreateTableChecked: boolean = false;
  
  // The content that's pasted.
  private inputText: string = '';

  private readonly defaultTableName: string = '#tempdata';

  constructor(
    public store: ToolExcelToInsertStore,
    private toolsStore: ToolsStore,
    private excelParser: ExcelParserService
  ) {
    this.toolsStore.setTool(Tools.ExcelToInsert);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  // Event Handlers

  public onContentPasted(content: string): void {
    this.inputText = content;
    this.store.parseContent(content);
  }

  public onScriptTableChange(): void {
  }

  public onTableNameChange(): void {
    this.store.setTableName(this.tableName);
  }

}
