import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-discord-link-pw-input-dialog',
  templateUrl: './discord-link-pw-input-dialog.component.html',
  styleUrls: ['./discord-link-pw-input-dialog.component.css']
})
export class DiscordLinkPwInputDialogComponent implements OnInit {

  discordActivationKey = "";
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onCreateBtnClick(){
    this.dialogRef.close(this.discordActivationKey);
  }

}
