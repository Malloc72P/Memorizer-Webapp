import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRequestService} from './SocialLogin/auth-request/auth-request.service';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './SocialLogin/auth-interceptor/auth-interceptor.service';




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
  ],
})
export class ControllerModule { }
