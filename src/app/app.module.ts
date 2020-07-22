import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemorizerMainComponent } from './view/memorizer-main/memorizer-main.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MainHeaderComponent } from './view/memorizer-main/main-header/main-header.component';
import { MainSidebarComponent } from './view/memorizer-main/main-content/main-sidebar/main-sidebar.component';
import { MainNavigatorComponent } from './view/memorizer-main/main-content/main-navigator/main-navigator.component';
import { MainArticleComponent } from './view/memorizer-main/main-content/main-article/main-article.component';
import { SectionCardComponent } from './view/memorizer-main/main-content/main-navigator/section-card/section-card.component';
import { SubNavigatorComponent } from './view/memorizer-main/main-content/sub-navigator/sub-navigator.component';
import {MatRippleModule} from '@angular/material/core';
import { ProblemCardComponent } from './view/memorizer-main/main-content/sub-navigator/problem-card/problem-card.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgWhiteboardModule} from 'ng-whiteboard';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import { CreateSectionDialogComponent } from './view/memorizer-main/main-dialog/create-section-dialog/create-section-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateProblemDialogComponent } from './view/memorizer-main/main-dialog/create-problem-dialog/create-problem-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule, Routes} from '@angular/router';
import { LoginPageComponent } from './model/login-ctrl/login-page/login-page.component';
import { LogoutPageComponent } from './model/login-ctrl/logout-page/logout-page.component';
import { AuthProcessComponent } from './model/login-ctrl/auth-process/auth-process.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './Controller/SocialLogin/auth-interceptor/auth-interceptor.service';
import { DebugDialogComponent } from './view/memorizer-main/main-dialog/debug-dialog/debug-dialog.component';
import {AuthRequestService} from './Controller/SocialLogin/auth-request/auth-request.service';
import {TempDataMgrService} from './document/temp-data-mgr/temp-data-mgr.service';
import {RouteCtrlService} from './model/route-ctrl/route-ctrl.service';
import {DialogCtrlService} from './model/dialog-ctrl/dialog-ctrl.service';
import {MatMenuModule} from '@angular/material/menu';
import { AreYouSureDialogComponent } from './view/memorizer-main/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {UpdateSectionDialogComponent} from './view/memorizer-main/main-dialog/update-section-dialog/update-section-dialog.component';

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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    MemorizerMainComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainNavigatorComponent,
    MainArticleComponent,
    SectionCardComponent,
    SubNavigatorComponent,
    ProblemCardComponent,
    CreateSectionDialogComponent,
    UpdateSectionDialogComponent,
    CreateProblemDialogComponent,
    LoginPageComponent,
    LogoutPageComponent,
    AuthProcessComponent,
    DebugDialogComponent,
    AreYouSureDialogComponent,
  ],
  entryComponents: [
    CreateSectionDialogComponent,
    UpdateSectionDialogComponent,
    CreateProblemDialogComponent,
    // DebugDialogComponent,
    AreYouSureDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
    MatInputModule,
    MatButtonToggleModule,
    NgWhiteboardModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthRequestService,
    TempDataMgrService,
    RouteCtrlService,
    DialogCtrlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
