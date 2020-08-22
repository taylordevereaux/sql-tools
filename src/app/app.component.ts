import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { ToolsStore } from './tools/tools.store';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private toolsStore: ToolsStore,
    private router: Router
  ) {
    if (this.router.url === '/excel-to-insert') {
      this.setActiveToolByUrl(this.router.url);
    }

    this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
    .subscribe(
        event => { this.setActiveToolByUrl(event.url); }
    );
  }


  private setActiveToolByUrl(url: string): void {
    
  }

}
