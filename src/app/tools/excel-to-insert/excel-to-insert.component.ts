import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ToolsStore } from '../tools.store';
import { Options } from '../options/options';

@Component({
  selector: 'app-excel-to-insert',
  templateUrl: './excel-to-insert.component.html',
  styleUrls: ['./excel-to-insert.component.scss']
})
export class ExcelToInsertComponent implements OnInit, AfterContentInit {

  constructor(private store: ToolsStore) { 
    // this.store.addOption(Options.InputExcelPaste);
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

}
