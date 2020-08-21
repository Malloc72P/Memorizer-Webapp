import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {CreateSectionDialogComponent} from '../main-dialog/create-section-dialog/create-section-dialog.component';
import {CreateProblemDialogComponent} from '../main-dialog/create-problem-dialog/create-problem-dialog.component';

import {
  AreYouSureDialogComponent,
  AreYouSureDialogData
} from '../main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {
  UpdateSectionDialogComponent,
  UpdateSectionDialogData
} from '../main-dialog/update-section-dialog/update-section-dialog.component';
import {SectionDto} from '../../../model/dto/section.dto';
import {
  UpdateProblemDialogComponent,
  UpdateProblemDialogData
} from '../main-dialog/update-problem-dialog/update-problem-dialog.component';
import {DiscordLinkPwInputDialogComponent} from '../main-dialog/discord-link-pw-input-dialog/discord-link-pw-input-dialog.component';

class Rectangle {
  public width:number;
  public height:number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DialogCtrlService {

  constructor(public dialog: MatDialog) {}

  openCreateSectionDialog(): Observable<any> {
    const dialogRef = this.dialog.open(CreateSectionDialogComponent, {
      width: '400px',
      data: {}
    });

    return dialogRef.afterClosed();
  }
  openUpdateSectionDialog(updateSectionDialogData:UpdateSectionDialogData): Observable<any> {
    const dialogRef = this.dialog.open(UpdateSectionDialogComponent, {
      width: '400px',
      data: updateSectionDialogData
    });

    return dialogRef.afterClosed();
  }

  openCreateProblemDialog() :Observable<any>{
    let windowRect:Rectangle = this._getDialogRect(0.8, 0.7);

    const dialogRef = this.dialog.open(CreateProblemDialogComponent, {
      width   : `${windowRect.width}px`,
      height  : `${windowRect.height}px`,
      panelClass : "fix-mat-dialog-overflow",
      data: {}
    });
    return dialogRef.afterClosed();
  }
  openUpdateProblemDialog(updateProblemDialogData:UpdateProblemDialogData): Observable<any> {
    let windowRect:Rectangle = this._getDialogRect(0.8, 0.7);
    const dialogRef = this.dialog.open(UpdateProblemDialogComponent, {
      width   : `${windowRect.width}px`,
      height  : `${windowRect.height}px`,
      panelClass : "fix-mat-dialog-overflow",
      data: updateProblemDialogData
    });

    return dialogRef.afterClosed();
  }

  openDebugDialog(){
    // const dialogRef = this.dialog.open(DebugDialogComponent, {
    //   width: '720px',
    //   data: {}
    // });
    // return dialogRef.afterClosed();
  }
  openAreYouSureDialog(areYouSureDialogData:AreYouSureDialogData){
    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      width: '400px',
      data: areYouSureDialogData
    });
    return dialogRef.afterClosed();
  }
  openDiscordLinkPwInputDialog(){
    const dialogRef = this.dialog.open(DiscordLinkPwInputDialogComponent, {
      width: '400px',
      data: null
    });
    return dialogRef.afterClosed();
  }

  private _getDialogRect(widthRatio:number, heightRatio:number, defaultWidth:number = 400, defaultHeight:number = 500) : Rectangle{
    let mainOuterWrapper = document.getElementById("MAIN_OUTER_WRAPPER");
    let wrapperRect = mainOuterWrapper.getBoundingClientRect();
    let dialogWidth   = wrapperRect.width   ? (wrapperRect.width  * widthRatio)   : (defaultWidth);
    let dialogHeight  = wrapperRect.height  ? (wrapperRect.height * heightRatio)  : (defaultHeight);

    return new Rectangle(dialogWidth, dialogHeight);
  }


}
