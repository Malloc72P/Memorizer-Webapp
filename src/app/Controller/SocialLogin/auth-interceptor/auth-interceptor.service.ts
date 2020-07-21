import { Injectable } from '@angular/core';
import {AuthRequestService} from '../auth-request/auth-request.service';
import {HttpEvent, HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem("accessToken");
    let authorizationFieldValue = `Bearer ${authToken}`;
    request = request.clone({
      setHeaders: {
        Authorization: authorizationFieldValue
      }
    });
    return next.handle(request);
  }
}
