import {Component, Input, OnInit} from '@angular/core';
import {SectionDto} from '../../../../../model/dto/section.dto';
import {PaletteMgrService} from '../../../../../model/palette-mgr/palette-mgr.service';
import {TempDataMgrService} from '../../../../../document/temp-data-mgr/temp-data-mgr.service';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css','../../../../dase-style/color-style.css']
})
export class SectionCardComponent implements OnInit {
  @Input() sectionDto:SectionDto;
  @Input() index:number;
  constructor(
    public paletteMgrService:PaletteMgrService,
    public tempDataMgrService:TempDataMgrService,
  ) { }

  ngOnInit(): void {
  }
  onSectionCardClicked(){
    this.tempDataMgrService.selectSection(this.sectionDto);
  }

}
