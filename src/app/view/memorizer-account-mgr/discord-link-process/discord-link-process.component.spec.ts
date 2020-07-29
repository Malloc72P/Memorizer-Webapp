import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordLinkProcessComponent } from './discord-link-process.component';

describe('DiscordLinkProcessComponent', () => {
  let component: DiscordLinkProcessComponent;
  let fixture: ComponentFixture<DiscordLinkProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscordLinkProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordLinkProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
