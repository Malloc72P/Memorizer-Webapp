import { TestBed } from '@angular/core/testing';

import { ControllerEventMgrService } from './controller-event-mgr.service';

describe('ControllerEventMgrService', () => {
  let service: ControllerEventMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllerEventMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
