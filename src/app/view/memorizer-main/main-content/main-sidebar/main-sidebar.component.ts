import {Component, OnInit} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainViewCtrlService} from '../../../../model/main-action-ctrl/main-view-ctrl.service';
import {DialogCtrlService} from '../../../../model/dialog-ctrl/dialog-ctrl.service';
import {SectionDto} from '../../../../model/dto/section.dto';
import {SectionRequesterService} from '../../../../Controller/section-requester/section-requester.service';
import {TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {ProblemRequesterService} from '../../../../Controller/problem-requester/problem-requester.service';
import {AreYouSureDialogData} from '../../main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';

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
    public problemRequester:ProblemRequesterService
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
          if (result) {
            this.tempDataMgrService.createSection(result);
          }
      });
  }
  onCreateProblemBtnClick(){
    this.dialogCtrlService.openCreateProblemDialog()
      .subscribe(result => {
        console.log("SectionDialogCtrlService >> onCreateProblemBtnClick >> afterClosed >> result : ",result);
        if(!result){
          return;
        }
        if (this.tempDataMgrService.currSection && this.tempDataMgrService.currSection._id) {
          this.tempDataMgrService.createProblem(result, this.tempDataMgrService.currSection._id);
        }else{
          this.dialogCtrlService.openAreYouSureDialog(
            new AreYouSureDialogData("수행할 수 없는 명령입니다","섹션을 선택한 다음 다시 시도해주세요", true)
          ).subscribe(()=>{})
        }
      });

  }
  onDebugBtnClicked(){
    // this.dialogCtrlService.openDebugDialog()
    //   .subscribe(result => {
    //     this.tempDataMgrService.createSection(result)
    //   });
  }

}
