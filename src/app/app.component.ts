import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { ToolsStore } from './tools/tools.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  title: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: ToolsStore
  ) {
    store.state$.subscribe(state => this.title = state.title);
  }

}
