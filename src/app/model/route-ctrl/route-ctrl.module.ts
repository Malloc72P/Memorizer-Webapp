import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouteCtrlService} from './route-ctrl.service';
import {RouterModule, Routes} from '@angular/router';
import {MemorizerMainComponent} from '../../view/memorizer-main/memorizer-main.component';
import {LoginPageComponent} from '../../view/memorizer-account-mgr/login-page/login-page.component';
import {LogoutPageComponent} from '../../view/memorizer-account-mgr/logout-page/logout-page.component';
import {AuthProcessComponent} from '../../view/memorizer-account-mgr/auth-process/auth-process.component';
import {DiscordLinkProcessComponent} from '../../view/memorizer-account-mgr/discord-link-process/discord-link-process.component';
import {ProblemProcessComponent} from '../../view/memorizer-account-mgr/problem-process/problem-process.component';

const appRoutes: Routes = [
  {
    path: 'homepage',
    component: MemorizerMainComponent,
    data: { title: '메모라이저' },
  },
  {
    path: 'mainpage',
    component: MemorizerMainComponent,
    data: { title: '메모라이저' },
  },
  {
    path: '',
    redirectTo: 'mainpage',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'SocialLogin' }
  },
  {
    path: 'signout',
    component: LogoutPageComponent,
    data: { title: 'SignOut' }
  },
  {
    path: 'login/success/:authToken/:idToken/:email/:userName',
    component: AuthProcessComponent,
    data: { title: 'Whiteboard' }
  },
  {
    path: 'login/failure',
    component: AuthProcessComponent,
    data: { title: 'homepage' }
  },
  {
    path: 'discord/linking/:discordDataOID',
    component: DiscordLinkProcessComponent,
    data: { title: 'discordLinking' }
  },
  {
    path: 'problem/:sectionId/:problemId',
    component: ProblemProcessComponent,
    data: { title: 'problemProcess' }
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers : [
    RouteCtrlService
  ],
})
export class RouteCtrlModule { }
