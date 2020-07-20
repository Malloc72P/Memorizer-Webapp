import { TestBed } from '@angular/core/testing';

import { SectionDialogCtrlService } from './section-dialog-ctrl.service';

describe('SectionDialogCtrlService', () => {
  let service: SectionDialogCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionDialogCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
