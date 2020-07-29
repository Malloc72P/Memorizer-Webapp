import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TempDataMgrService} from './temp-data-mgr/temp-data-mgr.service';
import {ControllerModule} from '../controller/controller.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers : [
    TempDataMgrService,
  ],
})
export class DocumentModule { }
