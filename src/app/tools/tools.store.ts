import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { map } from 'rxjs/operators';

import { ToolsState } from './tools.state';
import { Observable } from 'rxjs';
import { Options } from './options/options';
import { Tools } from './tools';

@Injectable({
  providedIn: 'root'
})
export class ToolsStore extends Store<ToolsState> {
  constructor() {
    super({
        options: []
    });
  }

  public get options$(): Observable<Options[]> {
      return this.state$.pipe(map(x => x.options));
  }

  setTool(tool: Tools): void {
      switch (tool) {
          case Tools.ExcelToInsert:
              this.addOption(Options.InputExcelPaste);
              break;
      }
  }

  addOption(option: Options): void {
      this.setState({
          ...this.state,
          options: [
              ...this.state.options,
              option
            ]
      });
  }
}
