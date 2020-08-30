import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss']
})
export class OptionItemComponent {
  @Input() class = '';

  constructor() { }

  @HostBinding('class')
  get hostClasses(): string {
    return ['option-item', this.class].join(' ');
  }
}
