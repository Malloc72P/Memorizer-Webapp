import { Component, OnInit } from '@angular/core';
import {TempDataMgrService} from '../../../document/temp-data-mgr/temp-data-mgr.service';
import {AuthRequestService} from '../../../Controller/SocialLogin/auth-request/auth-request.service';
import {HttpHelper} from '../../../config/http-helper/http-helper';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css',
              '../../dase-style/toolbar-style.css',
              '../../dase-style/color-style.scss'
  ]
})
export class MainHeaderComponent implements OnInit {

  constructor(
    public tempDataMgrService:TempDataMgrService,
    public authRequestService:AuthRequestService,
  ) { }

  ngOnInit(): void {
  }
  onLoginBtnClicked(){
    HttpHelper.redirectTo(HttpHelper.api.authGoogle.uri);
  }
  onLogoutBtnClicked(){
    this.authRequestService.signOut();
  }

}
