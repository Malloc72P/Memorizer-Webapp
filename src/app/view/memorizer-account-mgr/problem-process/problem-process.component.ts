import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteCtrlService} from '../../../model/route-ctrl/route-ctrl.service';
import {HttpHelper} from '../../../config/http-helper/http-helper';

@Component({
  selector: 'app-problem-process',
  templateUrl: './problem-process.component.html',
  styleUrls: ['./problem-process.component.css']
})
export class ProblemProcessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private routeCtrlService: RouteCtrlService,
  ) {
    let sectionId = this.route.snapshot.paramMap.get('sectionId');
    let problemId = this.route.snapshot.paramMap.get('problemId');
    //
    localStorage.setItem("sectionId", sectionId);
    localStorage.setItem("problemId", problemId);

    if(!localStorage.getItem("accessToken")){
      this.onNoAccessTokenState();
    }else{
      this.onAccessTokenIsExist();
    }
  }

  ngOnInit(): void {
  }
  onAccessTokenIsExist(){
    this.routeCtrlService.goToMainPage();
  }
  //엑세스토큰이 없다면 사용자가 로그인 하게 함
  onNoAccessTokenState(){
    HttpHelper.redirectTo(HttpHelper.api.authGoogle.uri);
  }

}
