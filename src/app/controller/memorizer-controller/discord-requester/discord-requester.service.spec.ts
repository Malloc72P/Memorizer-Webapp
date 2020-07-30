import { TestBed } from '@angular/core/testing';

import { DiscordRequesterService } from './discord-requester.service';

describe('DiscordRequesterService', () => {
  let service: DiscordRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscordRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
