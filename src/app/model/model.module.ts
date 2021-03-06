import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouteCtrlModule} from './route-ctrl/route-ctrl.module';
import {PaletteMgrModule} from './palette-mgr/palette-mgr.module';
import {MainActionCtrlModule} from './main-action-ctrl/main-action-ctrl.module';
import {CalcHelpModule} from './calc-help/calc-help.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouteCtrlModule,
    PaletteMgrModule,
    MainActionCtrlModule,
    CalcHelpModule
  ],
  providers : [
  ]
})
export class ModelModule { }
