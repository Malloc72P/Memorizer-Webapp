import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpHelper} from '../../../config/http-helper/http-helper';
import {RouteCtrlService} from '../../../model/route-ctrl/route-ctrl.service';

@Component({
  selector: 'app-discord-link-process',
  templateUrl: './discord-link-process.component.html',
  styleUrls: ['./discord-link-process.component.css']
})
export class DiscordLinkProcessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private routeCtrlService: RouteCtrlService,
  ) {
    let discordDataOID = this.route.snapshot.paramMap.get('discordDataOID');
    localStorage.setItem("discordDataOID", discordDataOID);
    localStorage.setItem("isLinkingDiscordSequence", "y");
    if(!localStorage.getItem("accessToken")){
      this.onNoAccessTokenState();
    }else{
      this.onAccessTokenIsExist();
    }
  }

  ngOnInit(): void {
  }
  //엑세스토큰이 있다면, 바로 protectedApi를 요청함
  onAccessTokenIsExist(){
    //이 경우에도 바로 메인 컴포넌트로 보내버리자
    //그러면 자동으로 AuthRequesterService 가 가동되어 링킹작업이 처리될 것임
    this.routeCtrlService.goToMainPage();
  }
  //엑세스토큰이 없다면 사용자가 로그인 하게 함
  onNoAccessTokenState(){
    HttpHelper.redirectTo(HttpHelper.api.authGoogle.uri);
    //그러면 해당 컴포넌트에서 이탈하게 됨.
    //로그인이 완료되면 자동으로 메인 컴포넌트로 진입하게 되므로, 로컬스토리지에 플래그를 저장하자
    //그러면 AuthRequestService 에서 그 플래그값을 체크하고, 링킹작업이 필요하면 해당 작업을 수행하게 하자
  }

}
