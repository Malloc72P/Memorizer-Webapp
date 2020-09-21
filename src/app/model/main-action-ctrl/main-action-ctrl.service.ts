import {EventEmitter, Inject, Injectable, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export class MainViewActionEvent {
  data:any;
  action:MainViewActionEventEnum;

  constructor(data: any, action: MainViewActionEventEnum) {
    this.data = data;
    this.action = action;
  }
}
export enum MainViewActionEventEnum {
  NAV_TOGGLE_BTN_CLICKED,
  ACTIVATE_SEARCH_MODE,
  DEACTIVATE_SEARCH_MODE,
}

@Injectable({
  providedIn: 'root'
})
export class MainActionCtrlService implements OnInit{
  public mainViewActionEventEmitter:EventEmitter<any>;
  public isSearchMode = false;
  constructor(
    @Inject(DOCUMENT) public document: any
  ) {
    this.mainViewActionEventEmitter = new EventEmitter<any>();
  }
  ngOnInit(): void {
    console.log("MainActionCtrlService >> ngOnInit >> 진입함");
  }
  activateSearchMode(data?){
    this.isSearchMode = true;
    this.mainViewActionEventEmitter.emit(
      new MainViewActionEvent(data, MainViewActionEventEnum.ACTIVATE_SEARCH_MODE)
    );
  }
  deactivateSearchMode(data?){
    this.isSearchMode = false;
    this.mainViewActionEventEmitter.emit(
      new MainViewActionEvent(data, MainViewActionEventEnum.DEACTIVATE_SEARCH_MODE)
    );
  }
  toggleSearchMode(data?){
    if(this.isSearchMode){
      this.deactivateSearchMode(data);
    }else{
      this.activateSearchMode(data);
    }
  }
  onFullScreenBtnToggled(){
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen()
        .then(()=>{})
        .catch(()=>{})
    }else if(document.exitFullscreen){
      document.exitFullscreen()
        .then(()=>{})
        .catch(()=>{})
    }
  }
}
