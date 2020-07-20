import { TestBed } from '@angular/core/testing';

import { SectionApiRequesterService } from './section-api-requester.service';

describe('SectionApiRequesterService', () => {
  let service: SectionApiRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionApiRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
