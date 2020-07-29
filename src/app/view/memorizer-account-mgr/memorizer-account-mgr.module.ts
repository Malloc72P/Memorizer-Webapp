import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from './login-page/login-page.component';
import {LogoutPageComponent} from './logout-page/logout-page.component';
import {AuthProcessComponent} from './auth-process/auth-process.component';
import { DiscordLinkProcessComponent } from './discord-link-process/discord-link-process.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginPageComponent,
    LogoutPageComponent,
    AuthProcessComponent,
    DiscordLinkProcessComponent,
  ],
})
export class MemorizerAccountMgrModule { }
