import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ToolsStore } from '../tools.store';
import { Tools } from '../tools';
import { ExcelParserService } from '@services/excel-parser.service';

@Component({
  selector: 'app-excel-to-insert',
  templateUrl: './excel-to-insert.component.html',
  styleUrls: ['./excel-to-insert.component.scss']
})
export class ExcelToInsertComponent implements OnInit, AfterContentInit {

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

  public onContentPasted(content: string): void {
    const output = this.excelParser.parseSQLInsertInto(content, 'test');
    this.store.setContent(output);
  }

}
