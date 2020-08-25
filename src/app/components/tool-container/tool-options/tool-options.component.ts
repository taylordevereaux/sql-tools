import { Component, OnInit } from '@angular/core';
import { ToolContainerComponent } from '../tool-container.component';

@Component({
  selector: 'app-tool-options',
  templateUrl: './tool-options.component.html',
  styleUrls: ['./tool-options.component.scss']
})
export class ToolOptionsComponent { 

  constructor(parent: ToolContainerComponent) { }

}
