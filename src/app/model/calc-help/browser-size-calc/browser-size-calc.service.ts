import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserSizeCalcService {

  constructor() { }
  public getBrowserWidth() : number{
    let mainOuterWrapper = document.getElementById("MAIN_OUTER_WRAPPER");
    let wrapperRect = mainOuterWrapper.getBoundingClientRect();
    return wrapperRect.width;
  }
  public getBrowserHeight() : number{
    let mainOuterWrapper = document.getElementById("MAIN_OUTER_WRAPPER");
    let wrapperRect = mainOuterWrapper.getBoundingClientRect();
    return wrapperRect.height;
  }
  public getElementTopLeft(id){
    let element = document.getElementById(id);
    if(!element){
      return
    }
    console.log("element : ",element);
  }
  public getMainContentWrapperHeight(){
    return window.innerHeight - 64;
  }

}
