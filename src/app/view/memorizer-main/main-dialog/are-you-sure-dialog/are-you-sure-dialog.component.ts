import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export class AreYouSureDialogData {
  public mainMsg;
  public subMsg;
  public isAlertMode;

  constructor(mainMsg, subMsg, isAlertMode) {
    this.mainMsg = mainMsg;
    this.subMsg = subMsg;
    this.isAlertMode = isAlertMode;
  }
}
@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.css', '../../../dase-style/dialog-style.css']
})
export class AreYouSureDialogComponent implements OnInit {
  public mainMsg;
  public subMsg;
  public isAlertMode;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:AreYouSureDialogData) {
    this.mainMsg = data.mainMsg;
    this.subMsg = data.subMsg;
    this.isAlertMode = data.isAlertMode;
  }

  ngOnInit(): void {
  }
  onYesClick(): void{
    this.dialogRef.close(true)
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
