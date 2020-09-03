import { Component, OnInit } from '@angular/core';
import { ToolPasteToInClauseStore } from './tool-paste-to-in-clause.store';
import { InputExcelPasteResult } from '@components/options/input-excel-paste/input-excel-paste.component';

@Component({
  selector: 'app-tool-paste-to-in-clause',
  templateUrl: './tool-paste-to-in-clause.component.html',
  styleUrls: ['./tool-paste-to-in-clause.component.scss']
})
export class ToolPasteToInClauseComponent implements OnInit {
  // The content that's pasted.
  public inputText = '';

  constructor(public store: ToolPasteToInClauseStore) { }

  ngOnInit() {
  }

  public onContentPasted(result: InputExcelPasteResult): void {
    this.inputText = result.content;
    this.store.parseContent(result.content);
  }
}
