import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ToolsStore } from './tools.store';
import { Options } from '@components/options/options';
import { filter, delay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tools } from './tools';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit, AfterContentInit, OnDestroy {
  public OptionsEnum = Options;
  public options: Options[];
  content: string;
  
  optionsSub: Subscription;

  toolsMap = {
    '/tool-excel-to-insert': Tools.ExcelToInsert,
  };

  headerMap = {
    [Options.InputExcelPaste]: 'Paste Content from Excel'
  }

  constructor(public store: ToolsStore, private router: Router) {
    this.store.state$.subscribe((state) => {
      this.options = state.options;
      this.content = state.content;
    });
  }

  ngOnInit(): void {
    // this.store.addOption(Options.InputExcelPaste);
  }

  ngAfterContentInit(): void {
    // this.store.options$
    //   .subscribe(options => this.options = options);
  }

  ngOnDestroy(): void {
    this.optionsSub.unsubscribe();
  }

  onCopyClick(e: Event): void {

  }
}
