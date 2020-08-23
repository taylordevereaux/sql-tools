import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-option-item-content',
  templateUrl: './option-item-content.component.html',
  styleUrls: ['./option-item-content.component.scss']
})
export class OptionItemContentComponent {
  @Input() class = '';

  constructor() { }

  @HostBinding('class')
  get hostClasses(): string {
    return ['option-item', this.class].join(' ');
  }
}
