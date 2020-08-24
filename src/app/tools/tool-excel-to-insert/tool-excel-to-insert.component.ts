import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ToolsStore } from '../tools.store';
import { Tools } from '../tools';
import { ExcelParserService } from '@services/excel-parser.service';
import { ThrowStmt } from '@angular/compiler';

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
    private store: ToolsStore,
    private excelParser: ExcelParserService
  ) {
    this.store.setTool(Tools.ExcelToInsert);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  private refreshOutput(): void {
    const tableName = (this.tableName || '') !== '' ? this.tableName : this.defaultTableName;

    let insertContent: string = '';
    let scriptTableContent: string = '';

    if (this.inputText !== '') {
      insertContent = this.excelParser.parseSQLInsertInto(this.inputText || '', tableName);
    }

    if (this.isCreateTableChecked) {
      scriptTableContent = this.scriptTableCreate(tableName);
    }

    const output = `${scriptTableContent}\nGO\n${insertContent}`;
    this.store.setContent(output);
  }

  private scriptTableCreate(tableName: string): string {
    return `CREATE TABLE ${tableName}
(

)`;
  }

  // Event Handlers

  public onContentPasted(content: string): void {
    this.inputText = content;
    this.refreshOutput();
  }

  public onScriptTableChange(): void {
    this.refreshOutput();
  }

}
