import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteCtrlService {

  constructor(
    private router: Router
  ) { }
  goToLoginPage(){
    this.goToTarget("login");
  }
  goToMainPage(){
    this.goToTarget("mainpage");
  }
  goToHomePage(){
    this.goToTarget("homepage");
  }
  redirectToHomePage(){
    document.location.href = "/homepage";
  }
  private goToTarget(target){
    this.router.navigate([target]);
  }
  public goBack(){
    history.back();
  }
}
