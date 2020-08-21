import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserSizeCalcService} from './browser-size-calc/browser-size-calc.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers : [
    BrowserSizeCalcService
  ]
})
export class CalcHelpModule { }
