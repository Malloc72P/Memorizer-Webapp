import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemProcessComponent } from './problem-process.component';

describe('ProblemProcessComponent', () => {
  let component: ProblemProcessComponent;
  let fixture: ComponentFixture<ProblemProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
