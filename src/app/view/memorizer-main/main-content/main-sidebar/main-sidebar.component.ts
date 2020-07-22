import {Component, OnInit} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainViewCtrlService} from '../../../../model/main-action-ctrl/main-view-ctrl.service';
import {DialogCtrlService} from '../../../../model/dialog-ctrl/dialog-ctrl.service';
import {SectionDto} from '../../../../model/dto/section.dto';
import {SectionRequesterService} from '../../../../Controller/section-requester/section-requester.service';
import {TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css',
  '../../../dase-style/color-style.scss']
})
export class MainSidebarComponent implements OnInit {

  constructor(
    public mainViewCtrlService:MainViewCtrlService,
    public dialogCtrlService:DialogCtrlService,
    public tempDataMgrService:TempDataMgrService,
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
        this.tempDataMgrService.createSection(result);
      });
  }
  onCreateProblemBtnClick(){
    this.dialogCtrlService.openCreateProblemDialog()
      .subscribe(result => {
        console.log("SectionDialogCtrlService >> onCreateProblemBtnClick >> afterClosed >> result : ",result);
        // this.sectionApiRequesterService.requestCreateProblem(result);
      });

  }
  onDebugBtnClicked(){
    // this.dialogCtrlService.openDebugDialog()
    //   .subscribe(result => {
    //     this.tempDataMgrService.createSection(result)
    //   });
  }

}
