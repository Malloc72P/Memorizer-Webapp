import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRequestService} from './SocialLogin/auth-request/auth-request.service';
import {RouteCtrlService} from '../model/route-ctrl/route-ctrl.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './SocialLogin/auth-interceptor/auth-interceptor.service';
import {ProblemRequesterService} from './problem-requester/problem-requester.service';
import {SectionRequesterService} from './section-requester/section-requester.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers : [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthRequestService,
    ProblemRequesterService,
    SectionRequesterService,
  ],
})
export class ControllerModule { }
