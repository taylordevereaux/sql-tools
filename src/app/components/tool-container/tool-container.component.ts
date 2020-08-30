import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-container',
  templateUrl: './tool-container.component.html',
  styleUrls: ['./tool-container.component.scss']
})
export class ToolContainerComponent implements OnInit {
  private isExpanded = false;
  public get expanded(): boolean {
    return this.isExpanded;
  }

  constructor() { }

  ngOnInit() {
  }

  public onExpanded(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }
}
