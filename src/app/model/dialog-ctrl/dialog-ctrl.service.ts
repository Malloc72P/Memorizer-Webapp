import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {CreateSectionDialogComponent} from '../../view/memorizer-main/main-dialog/create-section-dialog/create-section-dialog.component';
import {CreateProblemDialogComponent} from '../../view/memorizer-main/main-dialog/create-problem-dialog/create-problem-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogCtrlService {

  constructor(public dialog: MatDialog) {}

  openCreateSectionDialog(): Observable<any> {
    const dialogRef = this.dialog.open(CreateSectionDialogComponent, {
      width: '250px',
      data: {}
    });

    return dialogRef.afterClosed();
  }
  openCreateProblemDialog() :Observable<any>{
    const dialogRef = this.dialog.open(CreateProblemDialogComponent, {
      width: '250px',
      data: {}
    });
    return dialogRef.afterClosed();
  }
}
