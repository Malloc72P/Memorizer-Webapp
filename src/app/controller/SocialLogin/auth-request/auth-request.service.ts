import {EventEmitter, Injectable, Output} from '@angular/core';


import {ApiRequesterService} from '../api-requester/api-requester.service';
import {Observable} from 'rxjs';
import {UserDto} from '../../../model/dto/user.dto';
import {HttpHelper} from '../../../config/http-helper/http-helper';
import {RouteCtrlService} from '../../../model/route-ctrl/route-ctrl.service';
import {TempDataMgrService} from '../../../document/temp-data-mgr/temp-data-mgr.service';
import {ControllerEvent, ControllerEventEnum, ControllerEventMgrService} from '../../controller-event-mgr/controller-event-mgr.service';


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
    console.log("AuthRequestService >> constructor >> 진입함");
  }
  //저장된 토큰을 이용해서 유저의 인증정보를 초기화함
  initUserAuthData() :Promise<UserDto>{
    return new Promise<UserDto>((resolve)=>{
      if(this.checkLoggedInUser()){
        this.protectedApi().subscribe((userDto:UserDto)=>{
          resolve(userDto);
        });
      }
    });
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
      // this.apiRequester.post( HttpHelper.api.protected.uri )
      this.apiRequester.processRequest( HttpHelper.api.protected )
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
    this.apiRequester.processRequest(HttpHelper.api.signOut,{})
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
