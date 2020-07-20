import {Component, OnInit} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainViewCtrlService} from '../../../../model/main-action-ctrl/main-view-ctrl.service';
import {SectionDialogCtrlService} from '../../../../model/dialog-ctrl/section-dialog-ctrl/section-dialog-ctrl.service';
import {SectionApiRequesterService} from '../../../../model/api-requester/section-api-requester/section-api-requester.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(
    public mainViewCtrlService:MainViewCtrlService,
    public sectionDialogCtrlService:SectionDialogCtrlService,
    public sectionApiRequesterService:SectionApiRequesterService
  ) { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.mainViewCtrlService
      .mainViewActionEventEmitter
      .emit(new MainViewActionEvent(
        null, MainViewActionEventEnum.NAV_TOGGLE_BTN_CLICKED));
  }
  onCreateSecionBtnClick(){
    this.sectionDialogCtrlService.openCreateDialog()
        .subscribe(result => {
        console.log("SectionDialogCtrlService >> openDialog >> afterClosed >> result : ",result);
        this.sectionApiRequesterService.requestCreateSection(result);
      });
  }
  onCreateProblemBtnClick(){

  }

}
