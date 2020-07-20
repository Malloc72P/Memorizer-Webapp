import { Injectable } from '@angular/core';
import {SectionDto} from '../../dto/section.dto';
import {TempDataMgrService} from '../../../document/temp-data-mgr/temp-data-mgr.service';
import {ProblemDto} from '../../dto/problem.dto';

@Injectable({
  providedIn: 'root'
})
export class SectionApiRequesterService {

  constructor(
    private tempDataMgrService:TempDataMgrService
  ) { }
  requestCreateSection(newSectionTitle){
    let newSection:SectionDto = new SectionDto();
    newSection.title = newSectionTitle;
    this.tempDataMgrService.createSection(newSection);
  }
  requestCreateProblem(){

  }
}
