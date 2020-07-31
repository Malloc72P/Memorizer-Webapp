import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from './login-page/login-page.component';
import {LogoutPageComponent} from './logout-page/logout-page.component';
import {AuthProcessComponent} from './auth-process/auth-process.component';
import { DiscordLinkProcessComponent } from './discord-link-process/discord-link-process.component';
import {MemorizerControllerModule} from '../../controller/memorizer-controller/memorizer-controller.module';
import {DocumentModule} from '../../document/document.module';
import { ProblemProcessComponent } from './problem-process/problem-process.component';



@NgModule({
  imports: [
    CommonModule,
    MemorizerControllerModule,
    DocumentModule
  ],
  declarations: [
    LoginPageComponent,
    LogoutPageComponent,
    AuthProcessComponent,
    DiscordLinkProcessComponent,
    ProblemProcessComponent,
  ],
})
export class MemorizerAccountMgrModule { }
