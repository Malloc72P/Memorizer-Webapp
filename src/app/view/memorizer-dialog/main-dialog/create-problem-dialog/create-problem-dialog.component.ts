import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProblemDto} from '../../../../model/dto/problem.dto';

@Component({
  selector: 'app-create-problem-dialog',
  templateUrl: './create-problem-dialog.component.html',
  styleUrls: ['./create-problem-dialog.component.css']
})
export class CreateProblemDialogComponent implements OnInit {
  public newProblemDto:ProblemDto;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.newProblemDto = new ProblemDto();
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
