import { Component, OnInit } from '@angular/core';
import {TempDataMgrService} from '../../../document/temp-data-mgr/temp-data-mgr.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css',
              '../../dase-style/toolbar-style.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    public tempDataMgrService:TempDataMgrService
  ) { }

  ngOnInit(): void {
  }

}
