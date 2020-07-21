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
    if(!newSectionTitle){
      return;
    }
    let newSection:SectionDto = new SectionDto();
    newSection.title = newSectionTitle;
    this.tempDataMgrService.createSection(newSection);
  }
  requestCreateProblem(problemDto:ProblemDto){
    this.tempDataMgrService.createProblem(problemDto);

  }
}
