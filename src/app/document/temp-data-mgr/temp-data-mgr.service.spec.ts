import { TestBed } from '@angular/core/testing';

import { TempDataMgrService } from './temp-data-mgr.service';

describe('TempDataMgrService', () => {
  let service: TempDataMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempDataMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
