import { TestBed } from '@angular/core/testing';

import { MainViewCtrlService } from './main-view-ctrl.service';

describe('MainViewCtrlService', () => {
  let service: MainViewCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainViewCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
