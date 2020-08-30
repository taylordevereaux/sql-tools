import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.scss']
})
export class OptionItemComponent {
  @Input() class = '';
  @Input() headerText = '';

  private isExpanded = true;
  public get expanded(): boolean {
    return this.isExpanded;
  }

  constructor() { }

  @HostBinding('class')
  get hostClasses(): string {
    return ['option-item', this.isExpanded ? 'expanded' : '', this.class].join(' ');
  }

  onExpandClick(): void {
    this.isExpanded = !this.isExpanded;
  }
}
