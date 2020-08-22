import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolsStore extends Store<DashboardState> {
  constructor() {
    super({});
  }
}
