import { Injectable } from '@angular/core';
import {CreateSectionDialogComponent} from '../../../view/memorizer-main/main-dialog/create-section-dialog/create-section-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionDialogCtrlService {

  constructor(public dialog: MatDialog) {}

  openCreateDialog(): Observable<any> {
    const dialogRef = this.dialog.open(CreateSectionDialogComponent, {
      width: '250px',
      data: {}
    });

    return dialogRef.afterClosed();
  }
}
