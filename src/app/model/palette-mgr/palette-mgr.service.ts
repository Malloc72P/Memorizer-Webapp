import { Injectable } from '@angular/core';
import {DasePalleteEnum} from '../../view/dase-style/dase-pallete';

@Injectable({
  providedIn: 'root'
})
export class PaletteMgrService {

  constructor() { }
  getColorByIndex(index){
    return DasePalleteEnum[index];
  }
}
