import {Component, Input, OnInit} from '@angular/core';
import {ProblemDto} from '../../../../../model/dto/problem.dto';
import {TempDataMgrService} from '../../../../../document/temp-data-mgr/temp-data-mgr.service';

@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.css']
})
export class ProblemCardComponent implements OnInit {
  @Input() problemDto:ProblemDto;
  constructor(
    public tempDataMgrService:TempDataMgrService
  ) { }

  ngOnInit(): void {
  }
  onProblemCardClicked(){
    this.tempDataMgrService.selectProblem(this.problemDto);
  }
}
