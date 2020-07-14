import {Component, OnInit} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainViewCtrlService} from '../../../../model/main-action-ctrl/main-view-ctrl.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(
    public mainViewCtrlService:MainViewCtrlService
  ) { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.mainViewCtrlService
      .mainViewActionEventEmitter
      .emit(new MainViewActionEvent(
        null, MainViewActionEventEnum.NAV_TOGGLE_BTN_CLICKED));
  }

}
