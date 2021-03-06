import {Component, Inject, OnInit} from '@angular/core';
import {
  MainActionCtrlService,
  MainViewActionEvent,
  MainViewActionEventEnum
} from '../../../../model/main-action-ctrl/main-action-ctrl.service';
import {DialogCtrlService} from '../../../memorizer-dialog/dialog-ctrl/dialog-ctrl.service';
import {TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {ProblemRequesterService} from '../../../../controller/memorizer-controller/problem-requester/problem-requester.service';
import {AreYouSureDialogData} from '../../../memorizer-dialog/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {DaseDocumentEvent, DaseDocumentEventEnum} from '../../../../document/temp-data-mgr/DocumentEvent';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css',
  '../../../dase-style/color-style.scss']
})
export class MainSidebarComponent implements OnInit {
  constructor(
    public mainActionCtrlService:MainActionCtrlService,
    public dialogCtrlService:DialogCtrlService,
    public tempDataMgrService:TempDataMgrService,
    @Inject(DOCUMENT) public document: any
  ) { }
  public isFullScreenMode = false;
  public documentObject:any;
  ngOnInit(): void {
    this.documentObject = document.documentElement;
  }
  toggleSidebar(){
    this.mainActionCtrlService
      .mainViewActionEventEmitter
      .emit(new MainViewActionEvent(
        null, MainViewActionEventEnum.NAV_TOGGLE_BTN_CLICKED));
  }
  onCreateSecionBtnClick(){
    this.dialogCtrlService.openCreateSectionDialog()
        .subscribe(result => {
          if (result) {
            this.tempDataMgrService.createSection(result);
          }
      });
  }
  onCreateProblemBtnClick(){
    this.dialogCtrlService.openCreateProblemDialog()
      .subscribe(result => {
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
  onSelectModeBtnToggled(){
    this.tempDataMgrService.problemSelector.toggleProblemSelectMode();
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

  onSearchBtnClicked(){
    this.mainActionCtrlService.toggleSearchMode();
  }
  onDebugBtnClicked(){
    this.tempDataMgrService.debugEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.ON_DEBUG_REQUEST, null));
  }
}
