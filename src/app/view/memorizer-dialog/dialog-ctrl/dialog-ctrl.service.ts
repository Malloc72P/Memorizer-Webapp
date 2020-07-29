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
    const dialogRef = this.dialog.open(CreateProblemDialogComponent, {
      width: '400px',
      data: {}
    });
    return dialogRef.afterClosed();
  }
  openUpdateProblemDialog(updateProblemDialogData:UpdateProblemDialogData): Observable<any> {
    const dialogRef = this.dialog.open(UpdateProblemDialogComponent, {
      width: '400px',
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

}
