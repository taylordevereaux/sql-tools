/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OptionItemContentComponent } from './option-item-content.component';

describe('OptionItemContentComponent', () => {
  let component: OptionItemContentComponent;
  let fixture: ComponentFixture<OptionItemContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionItemContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
