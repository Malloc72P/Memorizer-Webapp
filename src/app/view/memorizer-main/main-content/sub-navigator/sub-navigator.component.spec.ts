import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavigatorComponent } from './sub-navigator.component';

describe('SubNavigatorComponent', () => {
  let component: SubNavigatorComponent;
  let fixture: ComponentFixture<SubNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
