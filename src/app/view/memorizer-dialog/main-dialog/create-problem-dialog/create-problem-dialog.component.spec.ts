import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProblemDialogComponent } from './create-problem-dialog.component';

describe('CreateProblemDialogComponent', () => {
  let component: CreateProblemDialogComponent;
  let fixture: ComponentFixture<CreateProblemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProblemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProblemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
