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
  NAV_TOGGLE_BTN_CLICKED
}

@Injectable({
  providedIn: 'root'
})
export class MainActionCtrlService {
  public mainViewActionEventEmitter:EventEmitter<any>;
  constructor() {
    this.mainViewActionEventEmitter = new EventEmitter<any>();
  }
}
