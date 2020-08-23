import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-option-item-header',
  templateUrl: './option-item-header.component.html',
  styleUrls: ['./option-item-header.component.scss']
})
export class OptionItemHeaderComponent {
  @Input() class = '';

  constructor() { }

  @HostBinding('class')
  get hostClasses(): string {
    return ['option-item-header', this.class].join(' ');
  }
}
