import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorizerMainComponent } from './memorizer-main.component';

describe('MemorizerMainComponent', () => {
  let component: MemorizerMainComponent;
  let fixture: ComponentFixture<MemorizerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorizerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorizerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
