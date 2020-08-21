import { TestBed } from '@angular/core/testing';

import { BrowserSizeCalcService } from './browser-size-calc.service';

describe('BrowserSizeCalcService', () => {
  let service: BrowserSizeCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserSizeCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
