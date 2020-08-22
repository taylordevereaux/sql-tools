import { Component, OnInit } from '@angular/core';
import { ToolsStore } from './tools.store';
import { Options } from './options/options';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  public OptionsEnum = Options;
  public options: Options[];


  constructor(private toolsStore: ToolsStore) { }

  ngOnInit() {
    this.toolsStore.addOption(Options.InputExcelPaste);

    this.toolsStore.options$
      .subscribe(options => this.options = options)
      .unsubscribe();
  }

}
