import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ToolContainerComponent } from '../tool-container.component';

@Component({
  selector: 'app-tool-output',
  templateUrl: './tool-output.component.html',
  styleUrls: ['./tool-output.component.scss']
})
export class ToolOutputComponent implements AfterViewInit, OnChanges {
  @ViewChild('outputContent') outputContent: ElementRef;
  @Input() copyContent  = '';

  public copyContentDelayed = '';

  constructor(parent: ToolContainerComponent) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if ('copyContent' in changes) {
      this.copyContentDelayed = this.copyContent;
    }
  }


  ngAfterViewInit(): void {
    this.copyContentDelayed = this.copyContent;
  }
}
