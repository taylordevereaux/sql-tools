import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ToolExcelToInsertStore } from './tool-excel-to-insert.store';
import { InputExcelPasteResult } from '@components/options/input-excel-paste/input-excel-paste.component';
import { ExcelToInsertOptions, ExcelToInsertColumn, DataType } from './tool-excel-to-insert.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tool-excel-to-insert',
  templateUrl: './tool-excel-to-insert.component.html',
  styleUrls: ['./tool-excel-to-insert.component.scss']
})
export class ExcelToInsertComponent implements OnInit, AfterContentInit {
  public DataType = DataType;
  public dataTypes: string[] = [];
  public tableName = '';
  public isCreateTableChecked = false;
  
  // The content that's pasted.
  public inputText = '';

  public get displayedColumns(): string[] {
    if (this.isCreateTableChecked) {
      return [
        'columnName',
        'dataType'
      ];
    } else {
      return ['dataType'];
    }
  }

  constructor(
    public store: ToolExcelToInsertStore
  ) {
    for (const dt in DataType) {
      this.dataTypes.push(dt);
    }
  }

  ngOnInit(): void {
    this.store.state$
      .pipe(
        map(x => x.isTableCreateScripted)
      )
      .subscribe((isCreateTableChecked: boolean) => this.isCreateTableChecked = isCreateTableChecked);
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

  public onTableNameChange(): void {
    this.store.setTableName(this.tableName);
  }

}
