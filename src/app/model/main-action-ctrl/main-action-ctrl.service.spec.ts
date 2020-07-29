import { TestBed } from '@angular/core/testing';

import { MainActionCtrlService } from './main-action-ctrl.service';

describe('MainViewCtrlService', () => {
  let service: MainActionCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainActionCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
