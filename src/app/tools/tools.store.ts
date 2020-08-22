import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { map } from 'rxjs/operators';

import { ToolsState } from './tools.state';
import { Observable } from 'rxjs';
import { Options } from './options/options';
import { Tools } from './tools';

@Injectable({
  providedIn: 'root',
})
export class ToolsStore extends Store<ToolsState> {

  private titlesMap = {
    [Tools.ExcelToInsert]: 'Excel to Insert'
  };


  constructor() {
    super({
      tool: Tools.None,
      options: [],
      title: 'SQL Tools'
    });
  }

  public get options$(): Observable<Options[]> {
    return this.state$.pipe(map((x) => x.options));
  }

  setTool(tool: Tools): void {

    const options: Options[] = [];

    switch (tool) {
      case Tools.ExcelToInsert:
        options.push(Options.InputExcelPaste);
        break;
      case Tools.None:
      default:
        break;
    }

    this.setState({
      ...this.state,
      options: [
        ...this.state.options,
        ...options
      ],
      title: this.titlesMap[tool]
    })

  }

  addOption(option: Options): void {
    this.setState({
      ...this.state,
      options: [...this.state.options, option],
    });
  }
}
