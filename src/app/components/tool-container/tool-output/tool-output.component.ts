import { Component, OnInit } from '@angular/core';
import { ToolContainerComponent } from '../tool-container.component';

@Component({
  selector: 'app-tool-output',
  templateUrl: './tool-output.component.html',
  styleUrls: ['./tool-output.component.scss']
})
export class ToolOutputComponent {

  constructor(parent: ToolContainerComponent) { }

}
