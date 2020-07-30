import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateSectionDialogComponent} from './main-dialog/create-section-dialog/create-section-dialog.component';
import {UpdateSectionDialogComponent} from './main-dialog/update-section-dialog/update-section-dialog.component';
import {CreateProblemDialogComponent} from './main-dialog/create-problem-dialog/create-problem-dialog.component';
import {UpdateProblemDialogComponent} from './main-dialog/update-problem-dialog/update-problem-dialog.component';
import {AreYouSureDialogComponent} from './main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {DialogCtrlService} from './dialog-ctrl/dialog-ctrl.service';
import {DebugDialogComponent} from './main-dialog/debug-dialog/debug-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { DiscordLinkPwInputDialogComponent } from './main-dialog/discord-link-pw-input-dialog/discord-link-pw-input-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
  ],
  declarations : [
    CreateSectionDialogComponent,
    UpdateSectionDialogComponent,
    CreateProblemDialogComponent,
    DebugDialogComponent,
    AreYouSureDialogComponent,
    UpdateProblemDialogComponent,
    DiscordLinkPwInputDialogComponent,
  ],
  entryComponents : [
    CreateSectionDialogComponent,
    UpdateSectionDialogComponent,
    CreateProblemDialogComponent,
    UpdateProblemDialogComponent,
    // DebugDialogComponent,
    AreYouSureDialogComponent,
    DiscordLinkPwInputDialogComponent
  ],
  providers : [
    DialogCtrlService,
  ],
})
export class MemorizerDialogModule { }
