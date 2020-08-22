/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputExcelPasteComponent } from './input-excel-paste.component';

describe('InputExcelPasteComponent', () => {
  let component: InputExcelPasteComponent;
  let fixture: ComponentFixture<InputExcelPasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputExcelPasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputExcelPasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
