import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionDialogComponent } from './update-section-dialog.component';

describe('UpdateSectionDialogComponent', () => {
  let component: UpdateSectionDialogComponent;
  let fixture: ComponentFixture<UpdateSectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
