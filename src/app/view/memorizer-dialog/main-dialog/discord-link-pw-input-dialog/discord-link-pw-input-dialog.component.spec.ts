import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordLinkPwInputDialogComponent } from './discord-link-pw-input-dialog.component';

describe('DiscordLinkPwInputDialogComponent', () => {
  let component: DiscordLinkPwInputDialogComponent;
  let fixture: ComponentFixture<DiscordLinkPwInputDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscordLinkPwInputDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordLinkPwInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
