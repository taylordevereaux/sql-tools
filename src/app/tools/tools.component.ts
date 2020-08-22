import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ToolsStore } from './tools.store';
import { Options } from './options/options';
import { filter, delay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tools } from './tools';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, AfterContentInit, OnDestroy {
  public OptionsEnum = Options;
  public options: Options[];
  optionsSub: Subscription;

  toolsMap = {
    '/excel-to-insert': Tools.ExcelToInsert
  };

  constructor(
    private store: ToolsStore,
    private router: Router
  ) {
    this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
    .subscribe(
        event => { this.setActiveToolByUrl(event.url); }
    );

  }

  ngOnInit() {
    // this.store.addOption(Options.InputExcelPaste);
  }

  ngAfterContentInit() {
    // this.store.options$
    //   .subscribe(options => this.options = options);
  }

  ngOnDestroy() {
    this.optionsSub.unsubscribe();
  }


  private setActiveToolByUrl(url: string): void {

    const tool = this.toolsMap[url];

    if (tool > 0) {
      this.store.setTool(tool);
      // this.options = this.store.state.options;
      this.optionsSub = this.store.options$
        .subscribe(options => this.options = options);
    }
  }

}
