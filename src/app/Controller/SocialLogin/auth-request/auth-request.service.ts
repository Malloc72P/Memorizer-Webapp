import {EventEmitter, Injectable, Output} from '@angular/core';



import {ApiRequesterService} from '../api-requester/api-requester.service';
import {Observable} from 'rxjs';
import {AuthEvent, AuthEventEnum} from './AuthEvent/AuthEvent';
import {UserDto} from '../../../model/dto/user.dto';
import {HttpHelper} from '../../../config/http-helper/http-helper';
import {RouteCtrlService} from '../../../model/route-ctrl/route-ctrl.service';
import {TempDataMgrService} from '../../../document/temp-data-mgr/temp-data-mgr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  @Output() authEventEmitter:EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiRequester: ApiRequesterService,
    private routeCtrlService: RouteCtrlService,
    private tempDataMgrService: TempDataMgrService,
  ) {
    //만약 토큰이 있다면 protectedApi를 시도하여 자동로그인함
    if(this.checkLoggedInUser()){
      this.protectedApi().subscribe((userDto:UserDto)=>{
        this.routeCtrlService.goToMainPage();
      });
    }
  }

  public checkLoggedInUser(){
    let accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  }

  /*엑세스 토큰 관리 메서드*/
  public setAuthToken(token){
    localStorage.setItem('accessToken', token);
  }
  private removeAccessToken(){
    localStorage.removeItem("accessToken");
  }
  public getAccessToken(){
    let accessToken = localStorage.getItem('accessToken');
    if(!accessToken){
      return null;
    } else{
      return accessToken;
    }
  }

  /*인증관련 API*/
  protectedApi() :Observable<UserDto>{
    return new Observable<UserDto>((observer)=>{
      console.log("AuthRequestService >> protectedApi >> 호출됨");
      let accessToken = localStorage.getItem('accessToken');
      this.setAuthToken(accessToken);
      this.apiRequester.post( HttpHelper.api.protected.uri )
        .subscribe((data)=>{
          let userDto:UserDto = new UserDto(
            data.userDto.email,
            data.userDto.idToken,
            data.userDto.accessToken,
            data.userDto.userName,
            data.userDto.profileImg
          );
          console.log("AuthRequestService >> protectedApi >> success >> userDto : ",userDto);
          this.tempDataMgrService.setUserDto(data.userDto);
          // this.authEventEmitter.emit(new AuthEvent(AuthEventEnum.SIGN_IN, userDto));
          observer.next(userDto);
        }, (error)=>{
          console.warn("AuthRequestService >>  >> error : ", error);
          this.signOutProcess();
        });
    });
  }
  signOut(){
    this.apiRequester.post(HttpHelper.api.signOut.uri,{})
      .subscribe(()=>{
        this.signOutProcess();
      },(error)=>{
        console.error(error);
        this.signOutProcess();
      });

  }
  public signOutProcess(){
    this.removeAccessToken();
    // this.authEventEmitter.emit(new AuthEvent(AuthEventEnum.SIGN_OUT, this.userInfo));
    // this.routerHelper.goToHomePage();
    this.routeCtrlService.redirectToHomePage();
  }


}
