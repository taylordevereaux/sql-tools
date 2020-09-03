import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { map, filter } from 'rxjs/operators';
import { ToolPasteToInClauseState } from './tool-paste-to-in-clause.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolPasteToInClauseStore extends Store<ToolPasteToInClauseState> {

  constructor() {
    super({
      items: []
    } as ToolPasteToInClauseState);
  }

  parseContent(content: string): void {
    const items = content.split('\n');
    this.setState({
      items
    });
  }
}