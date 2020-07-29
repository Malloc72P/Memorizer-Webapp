import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';

@Component({
  selector: 'app-debug-dialog',
  templateUrl: './debug-dialog.component.html',
  styleUrls: ['./debug-dialog.component.css']
})
export class DebugDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    public tempDataMgrService:TempDataMgrService,
    @Inject(MAT_DIALOG_DATA) public data) {
  }


  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
