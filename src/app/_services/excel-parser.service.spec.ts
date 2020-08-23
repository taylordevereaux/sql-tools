/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExcelParserService } from './excel-parser.service';

describe('Service: ExcelParser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelParserService]
    });
  });

  it('should ...', inject([ExcelParserService], (service: ExcelParserService) => {
    expect(service).toBeTruthy();
  }));
});
