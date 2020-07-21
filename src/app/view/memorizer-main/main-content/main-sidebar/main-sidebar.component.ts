import {Component, OnInit} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainViewCtrlService} from '../../../../model/main-action-ctrl/main-view-ctrl.service';
import {SectionApiRequesterService} from '../../../../model/api-requester/section-api-requester/section-api-requester.service';
import {DialogCtrlService} from '../../../../model/dialog-ctrl/dialog-ctrl.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(
    public mainViewCtrlService:MainViewCtrlService,
    public dialogCtrlService:DialogCtrlService,
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
    this.dialogCtrlService.openCreateSectionDialog()
        .subscribe(result => {
        console.log("SectionDialogCtrlService >> onCreateSecionBtnClick >> afterClosed >> result : ",result);
        this.sectionApiRequesterService.requestCreateSection(result);
      });
  }
  onCreateProblemBtnClick(){
    this.dialogCtrlService.openCreateProblemDialog()
      .subscribe(result => {
        console.log("SectionDialogCtrlService >> onCreateProblemBtnClick >> afterClosed >> result : ",result);
        this.sectionApiRequesterService.requestCreateProblem(result);
      });

  }
  onDebugBtnClicked(){
    this.dialogCtrlService.openDebugDialog()
      .subscribe(result => {
      });

  }

}
