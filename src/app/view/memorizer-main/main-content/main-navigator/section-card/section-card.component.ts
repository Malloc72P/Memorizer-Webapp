import {Component, Input, OnInit} from '@angular/core';
import {SectionDto} from '../../../../../model/dto/section.dto';
import {PaletteMgrService} from '../../../../../model/palette-mgr/palette-mgr.service';
import {TempDataMgrService} from '../../../../../document/temp-data-mgr/temp-data-mgr.service';
import {DialogCtrlService} from '../../../../memorizer-dialog/dialog-ctrl/dialog-ctrl.service';
import {AreYouSureDialogData} from '../../../../memorizer-dialog/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {UpdateSectionDialogData} from '../../../../memorizer-dialog/main-dialog/update-section-dialog/update-section-dialog.component';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css',
    '../../../../dase-style/color-style.scss',
    '../../../../dase-style/toolbar-style.css']
})
export class SectionCardComponent implements OnInit {
  @Input() sectionDto:SectionDto;
  @Input() index:number;
  constructor(
    public paletteMgrService:PaletteMgrService,
    public tempDataMgrService:TempDataMgrService,
    public dialogCtrlService:DialogCtrlService,
  ) { }

  ngOnInit(): void {
  }
  onSectionCardClicked(){
    this.tempDataMgrService.selectSection(this.sectionDto);
  }
  onUpdateBtnClicked(){
    this.dialogCtrlService.openUpdateSectionDialog(new UpdateSectionDialogData(this.sectionDto))
      .subscribe((newSectionTitle)=>{
        let newSectionDto:SectionDto = new SectionDto(this.sectionDto._id, this.sectionDto.owner, newSectionTitle);
        this.tempDataMgrService.updateSection(newSectionDto);
      })
  }
  onDeleteBtnClicked(){
    this.dialogCtrlService
      .openAreYouSureDialog(
        new AreYouSureDialogData(
        "정말로 삭제하시겠어요?",
        "해당 작업은 되돌릴 수 없어요",
          true)
      )
      .subscribe((result)=>{
        if(result){//삭제하겠다고 한다면...
          this.tempDataMgrService.deleteSection(this.sectionDto);
        }
      })
  }

}
