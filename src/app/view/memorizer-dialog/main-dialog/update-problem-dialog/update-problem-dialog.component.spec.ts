import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProblemDialogComponent } from './update-problem-dialog.component';

describe('UpdateProblemDialogComponent', () => {
  let component: UpdateProblemDialogComponent;
  let fixture: ComponentFixture<UpdateProblemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProblemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProblemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
