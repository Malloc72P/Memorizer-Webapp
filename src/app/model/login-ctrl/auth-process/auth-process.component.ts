import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthRequestService} from '../../../Controller/SocialLogin/auth-request/auth-request.service';
import {UserDto} from '../../dto/user.dto';

@Component({
  selector: 'app-auth-process',
  templateUrl: './auth-process.component.html',
  styleUrls: ['./auth-process.component.css']
})
export class AuthProcessComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public authRequester: AuthRequestService
  ) { }


  ngOnInit() {
    let authToken = this.route.snapshot.paramMap.get('authToken');
    let idToken     = this.route.snapshot.paramMap.get('idToken');
    let email       = this.route.snapshot.paramMap.get('email');
    let userName    = this.route.snapshot.paramMap.get('userName');
    console.log("AuthProcessComponent >> ngOnInit >> idToken : ",idToken);
    console.log("AuthProcessComponent >> ngOnInit >> userName : ",userName);
    console.log("AuthProcessComponent >> ngOnInit >> authToken : ",authToken);
    if(authToken){
      this.authRequester.setAuthToken(authToken);
      this.authRequester.protectedApi()
        .subscribe((data:UserDto)=>{
          this.router.navigate(["mainpage"]);
        });
    }
    else{
      this.authRequester.signOut();
    }
  }

}
