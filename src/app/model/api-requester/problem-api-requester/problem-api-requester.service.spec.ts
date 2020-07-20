import { TestBed } from '@angular/core/testing';

import { ProblemApiRequesterService } from './problem-api-requester.service';

describe('ProblemApiRequesterService', () => {
  let service: ProblemApiRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemApiRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
