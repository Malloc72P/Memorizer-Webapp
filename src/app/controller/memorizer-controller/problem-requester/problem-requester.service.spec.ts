import { TestBed } from '@angular/core/testing';

import { ProblemRequesterService } from './problem-requester.service';

describe('ProblemRequesterService', () => {
  let service: ProblemRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
