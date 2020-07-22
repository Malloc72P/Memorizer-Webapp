import { TestBed } from '@angular/core/testing';

import { SectionRequesterService } from './section-requester.service';

describe('SectionRequesterService', () => {
  let service: SectionRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
