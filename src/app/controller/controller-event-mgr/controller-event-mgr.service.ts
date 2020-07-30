import {EventEmitter, Injectable} from '@angular/core';
export class ControllerEvent {
  action:ControllerEventEnum;
  data:any;

  constructor(action: ControllerEventEnum, data: any) {
    this.action = action;
    this.data = data;
  }
}
export enum ControllerEventEnum {
  DISCORD_LINKING_REQUEST_DETECTED
}
@Injectable({
  providedIn: 'root'
})
export class ControllerEventMgrService {
  public ctrlEventEmitter:EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }
}
