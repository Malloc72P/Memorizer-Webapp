import { TestBed } from '@angular/core/testing';

import { DialogCtrlService } from './dialog-ctrl.service';

describe('DialogCtrlService', () => {
  let service: DialogCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
