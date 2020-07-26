import {Component, Input, OnInit} from '@angular/core';
import {ProblemDto} from '../../../../../model/dto/problem.dto';
import {TempDataMgrService} from '../../../../../document/temp-data-mgr/temp-data-mgr.service';
import {DialogCtrlService} from '../../../../../model/dialog-ctrl/dialog-ctrl.service';
import {UpdateProblemDialogData} from '../../../main-dialog/update-problem-dialog/update-problem-dialog.component';

@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: [
    './problem-card.component.css',
    '../../../../dase-style/toolbar-style.css',
  ]
})
export class ProblemCardComponent implements OnInit {
  @Input() problemDto:ProblemDto;
  constructor(
    public tempDataMgrService:TempDataMgrService,
    public dialogCtrlService:DialogCtrlService,
  ) { }

  ngOnInit(): void {
  }
  onProblemCardClicked(){
    this.tempDataMgrService.selectProblem(this.problemDto);
  }
  onUpdateProblemBtnClicked(){
    this.dialogCtrlService.openUpdateProblemDialog(new UpdateProblemDialogData(this.problemDto))
      .subscribe((result:ProblemDto)=>{
        if(result){
          console.log("ProblemCardComponent >> onUpdateProblemBtnClicked >> result : ",result);
          this.tempDataMgrService.updateProblem(result);
        }
      });
  }

  onDeleteProblemBtnClicked(){
    this.tempDataMgrService.deleteProblem(this.problemDto);
  }
}
