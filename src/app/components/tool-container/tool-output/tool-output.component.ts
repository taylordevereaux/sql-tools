import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToolContainerComponent } from '../tool-container.component';

@Component({
  selector: 'app-tool-output',
  templateUrl: './tool-output.component.html',
  styleUrls: ['./tool-output.component.scss']
})
export class ToolOutputComponent implements AfterViewInit {
  @ViewChild('outputContent') outputContent: ElementRef;
  @Input() copyContent  = '';

  public copyContentDelayed = '';

  constructor(parent: ToolContainerComponent) { }


  ngAfterViewInit(): void {
    this.copyContentDelayed = this.copyContent;
  }
}
