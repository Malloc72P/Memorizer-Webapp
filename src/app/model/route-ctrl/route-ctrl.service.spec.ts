import { TestBed } from '@angular/core/testing';

import { RouteCtrlService } from './route-ctrl.service';

describe('RouteCtrlService', () => {
  let service: RouteCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
