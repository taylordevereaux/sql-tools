import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToolContainerComponent } from '../tool-container.component';

@Component({
  selector: 'app-tool-options',
  templateUrl: './tool-options.component.html',
  styleUrls: ['./tool-options.component.scss']
})
export class ToolOptionsComponent implements OnInit  {
  private isExpanded = false;
  public get expanded() {
    return this.isExpanded;
  }

  constructor(private parent: ToolContainerComponent) { }

  ngOnInit() {
    this.parent.onExpanded(this.isExpanded);
  }

  onExpandClick(): void {
    this.isExpanded = !this.isExpanded;
    this.parent.onExpanded(this.isExpanded);
  }
}
