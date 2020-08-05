import {EventEmitter, Injectable} from '@angular/core';

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
export class MainActionCtrlService {
  public mainViewActionEventEmitter:EventEmitter<any>;
  public isSearchMode = true;
  constructor() {
    this.mainViewActionEventEmitter = new EventEmitter<any>();
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
    console.log("toggleSearchMode isSearchMode : ",this.isSearchMode);
  }

}
