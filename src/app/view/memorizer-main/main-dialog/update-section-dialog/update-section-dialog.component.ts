import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SectionDto} from '../../../../model/dto/section.dto';

export class UpdateSectionDialogData {
  public sectionDto:SectionDto;

  constructor(sectionDto: SectionDto) {
    this.sectionDto = sectionDto;
  }
}
@Component({
  selector: 'app-update-section-dialog',
  templateUrl: './update-section-dialog.component.html',
  styleUrls: ['./update-section-dialog.component.css', '../../../dase-style/dialog-style.css']
})
export class UpdateSectionDialogComponent implements OnInit {
  @Input() sectionDto:SectionDto;
  newSectionTitle = "";
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:UpdateSectionDialogData) {
    this.sectionDto = data.sectionDto;
    this.newSectionTitle = this.sectionDto.title.slice();
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onUpdateBtnClick(){
    this.dialogRef.close(this.newSectionTitle);
  }

}
