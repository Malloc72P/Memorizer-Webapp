import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-section-dialog',
  templateUrl: './create-section-dialog.component.html',
  styleUrls: ['./create-section-dialog.component.css']
})
export class CreateSectionDialogComponent implements OnInit {
  newSectionTitle = "";
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onCreateBtnClick(){
    this.dialogRef.close(this.newSectionTitle);
  }
}
