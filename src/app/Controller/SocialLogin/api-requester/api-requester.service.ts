import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiRequest, ApiRequestTypeEnum, HttpHelper} from '../../../config/http-helper/http-helper';

@Injectable({
  providedIn: 'root'
})
export class ApiRequesterService {

  private baseUrl: string = HttpHelper.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public processRequest(api:ApiRequest, params = null){
    switch (api.requestType) {
      case ApiRequestTypeEnum.GET:
        return this.get(api.uri, params);
      case ApiRequestTypeEnum.POST:
        return this.post(api.uri, params);
      case ApiRequestTypeEnum.PATCH:
        return this.patch(api.uri, params);
      case ApiRequestTypeEnum.DELETE:
        return this.delete(api.uri, params);
    }
  }

  //###### Pure Method
  public get(url, params = null): Observable<any> {
    return this.http.get(this.baseUrl + url, {
      params: params,
      headers: new HttpHeaders({
        'Content-Type': HttpHelper.getContentType()
      }),
      responseType: 'json'
    });
  }
  public getFile(url, params = null): Observable<any> {
    return this.http.get(this.baseUrl + url, {
      params: params,
      headers: new HttpHeaders({
        'Content-Type': HttpHelper.getContentType()
      }),
      responseType: 'blob'
    });
  }

  public post(url, params = null): Observable<any> {
    return this.http.post(this.baseUrl + url, params, {
      headers: new HttpHeaders({
        'Content-Type': HttpHelper.getContentType()
      }),
      responseType: 'json'
    });
  }
  public multipartPost(url, params = null): Observable<any> {
    return this.http.post(this.baseUrl + url, params, {
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }),
      responseType: 'json'
    });
  }
  public delete(url, params = null): Observable<any> {
    return this.http.request("delete",this.baseUrl + url, {
      headers: new HttpHeaders({
        'Content-Type': HttpHelper.getContentType()
      }),
      body : params,
      responseType: 'json',
    });
  }
  public patch(url, params = null): Observable<any> {
    return this.http.request("patch",this.baseUrl + url, {
      headers: new HttpHeaders({
        'Content-Type': HttpHelper.getContentType()
      }),
      body : params,
      responseType: 'json',
    });
  }

}
