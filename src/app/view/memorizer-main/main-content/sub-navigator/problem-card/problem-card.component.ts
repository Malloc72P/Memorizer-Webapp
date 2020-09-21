import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProblemDto} from '../../../../../model/dto/problem.dto';
import {TempDataMgrService} from '../../../../../document/temp-data-mgr/temp-data-mgr.service';
import {DialogCtrlService} from '../../../../memorizer-dialog/dialog-ctrl/dialog-ctrl.service';
import {UpdateProblemDialogData} from '../../../../memorizer-dialog/main-dialog/update-problem-dialog/update-problem-dialog.component';
import {DaseDocumentEvent, DaseDocumentEventEnum} from '../../../../../document/temp-data-mgr/DocumentEvent';
import {Subscription} from 'rxjs';
import {ProblemSelector} from '../../../../../document/temp-data-mgr/ProblemSelector/ProblemSelector';

@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: [
    './problem-card.component.css',
    '../../../../dase-style/toolbar-style.css',
  ]
})
export class ProblemCardComponent implements OnInit, OnDestroy {
  @Input() problemDto:ProblemDto;
  public isSelected:boolean = false;
  private problemSelector:ProblemSelector;
  private subscriptionList:Array<Subscription> = new Array<Subscription>();
  constructor(
    public tempDataMgrService:TempDataMgrService,
    public dialogCtrlService:DialogCtrlService,
  ) {
    this.problemSelector = this.tempDataMgrService.problemSelector;
    let subsc = this.tempDataMgrService.currProblemEventEmitter.subscribe((event:DaseDocumentEvent)=>{
      if(event.action === DaseDocumentEventEnum.UPDATE){
        let currProblem:ProblemDto = event.data as ProblemDto;
        if(!currProblem){
          return;
        }
        if(currProblem._id === this.problemDto._id){
          //지금 선택된 문제가 바로 이 컴포넌트임
          //문제선택모드가 아니면 isSelected는 true이고, 선택모드면 선택해제시킴
            //문제선택모드이면서, &&
            //이미 선택되었다면 = 선택해제하고, problemSelector에서 제거한다
          if(this.problemSelector.isProblemSelectMode && this.isSelected){
            this.isSelected = false;
            this.problemSelector.removeProblem(this.problemDto._id);
          }else{
            //문제선택모드가 아니라면, 그냥 true값을 저장한다.
            this.isSelected = true;
          }
        }else if(this.isSelected && !this.problemSelector.isProblemSelectMode){
          //새로운 선택된 문제가 현 문제와 같지 않은데 현 문제가 선택되어있는 경우
          //단, 문제선택모드면 해당 코드 수행 안함
          this.isSelected = false;
        }
      }
    });
    this.subscriptionList.push(subsc);

    let subsc2 = this.problemSelector.problemSelectorEventEmitter
      .subscribe((event:DaseDocumentEvent)=>{
      switch (event.action) {
        case DaseDocumentEventEnum.ACTIVATE_SELECT_MODE:
        case DaseDocumentEventEnum.DEACTIVATE_SELECT_MODE:
          this.isSelected = false;
      }
    });
    this.subscriptionList.push(subsc2);
  }

  ngOnInit(): void {
    let currProblem = this.tempDataMgrService.currProblem;
    if((currProblem && this.problemDto) && currProblem._id === this.problemDto._id){
      this.isSelected = true;
    }
  }
  ngOnDestroy() {
    for (let subsc of this.subscriptionList){
      subsc.unsubscribe();
    }
  }

  onProblemCardClicked(){
    this.tempDataMgrService.selectProblem(this.problemDto);
  }
  onUpdateProblemBtnClicked(){
    this.dialogCtrlService.openUpdateProblemDialog(new UpdateProblemDialogData(this.problemDto))
      .subscribe((result:ProblemDto)=>{
        if(result){
          this.tempDataMgrService.updateProblem(result);
        }
      });
  }

  onDeleteProblemBtnClicked(){
    this.tempDataMgrService.deleteProblem(this.problemDto);
  }
}
