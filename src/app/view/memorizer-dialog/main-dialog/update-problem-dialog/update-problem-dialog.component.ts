import {Component, Inject, OnInit} from '@angular/core';
import {ProblemDto} from '../../../../model/dto/problem.dto';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export class UpdateProblemDialogData{
  problemDto:ProblemDto;

  constructor(problemDto: ProblemDto) {
    this.problemDto = problemDto;
  }
}

@Component({
  selector: 'app-update-problem-dialog',
  templateUrl: './update-problem-dialog.component.html',
  styleUrls: [
    './update-problem-dialog.component.css',
    './../../../dase-style/font-style.scss'
  ]
})
export class UpdateProblemDialogComponent implements OnInit {

  public newProblemDto:ProblemDto;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:UpdateProblemDialogData) {
    this.newProblemDto = ProblemDto.duplicateIt(data.problemDto);

  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onCreateBtnClick(){
    this.dialogRef.close(this.newProblemDto);
  }

}
