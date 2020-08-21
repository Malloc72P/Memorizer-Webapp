import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainActionCtrlService} from '../../../../model/main-action-ctrl/main-action-ctrl.service';
import {TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {KeyValue} from '@angular/common';
import {ProblemDto} from '../../../../model/dto/problem.dto';
import {ProblemSelector} from '../../../../document/temp-data-mgr/ProblemSelector/ProblemSelector';

export enum SortBaseEnum {
  CORRECT_CNT,
  INCORRECT_CNT,
}
export enum SortDirectionEnum {
  ASC,
  DESC,
}

@Component({
  selector: 'app-sub-navigator',
  templateUrl: './sub-navigator.component.html',
  styleUrls: [
    './sub-navigator.component.css',
    '../../../dase-style/toolbar-style.css',
    '../../../dase-style/color-style.scss',
    '../../../dase-style/font-style.scss',
  ]
})
export class SubNavigatorComponent implements OnInit {

  SortBaseEnum = SortBaseEnum;
  SortDirectionEnum = SortDirectionEnum;

  public problemSortFunc:Function;

  @ViewChild('sidebarIdentifier') sidebarIdentifier: ElementRef;
  private problemSelector:ProblemSelector;

  constructor(
    public mainViewCtrlService:MainActionCtrlService,
    public tempDataMgrService:TempDataMgrService
  ) {
    this.problemSortFunc = SubNavigatorComponent.sortByCorrectCntDesc;
    this.mainViewCtrlService.mainViewActionEventEmitter
      .subscribe((event:MainViewActionEvent)=>{
        switch (event.action) {
          case MainViewActionEventEnum.NAV_TOGGLE_BTN_CLICKED:
            this.toggleNav();
            break;
        }
      });
    this.problemSelector = this.tempDataMgrService.problemSelector;
  }
  toggleNav(){
    if(this.isDisplayed){
      //현재 네비메뉴가 열려있다면 닫기
      this.prevWidth = this.navWidth;
      this.navWidth = 0;
      // this.sidebarIdentifier.nativeElement.style.visibility= "hidden";
      this.isDisplayed = false;
    }
    else{
      //닫혀있었다면 이전 가로길이를 복구
      this.navWidth = this.prevWidth;
      // this.sidebarIdentifier.nativeElement.style.visibility= "visible";
      this.isDisplayed = true;
    }
  }
  public navWidth = 220;
  public adjusterSize = 6;
  //이전 가로길이를 저장함
  private prevWidth = 220;
  //현재 네비메뉴가 출력되고 있는지 여부를 나타냄.
  //사이드바의 토글 버튼이 눌려서 숨김모드로 진입하면 false가 됨
  private isDisplayed = true;

  ngOnInit(): void {
  }

  onPointerDown(event){
    this.isDragging = true;
  }
  resizeSidebar(event){
    let offsetLeft = this.sidebarIdentifier.nativeElement.offsetLeft;
    let newWidth = event.x - offsetLeft + (this.adjusterSize / 2);
    if(newWidth < 160 || newWidth > 360){
      return
    }else{
      this.navWidth = newWidth;
    }
  }
  private isDragging = false;
  @HostListener('document:pointermove', ['$event']) onmousemove(e) {
    if (!this.isDragging) {
      return;
    }
    this.resizeSidebar(e);
  }

  @HostListener('document:pointerup', ['$event']) onmouseup(e) {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }
  public sortRefresher = 0;
  onSortBtnClicked(sortBase:SortBaseEnum, sortDirection:SortDirectionEnum){
    // this.tempDataMgrService.sortProblemListBy(sortBase, sortDirection);
    switch (sortBase) {
      case SortBaseEnum.CORRECT_CNT:
        if(sortDirection === SortDirectionEnum.ASC){
          this.problemSortFunc = SubNavigatorComponent.sortByCorrectCntAsc;
        }else{
          this.problemSortFunc = SubNavigatorComponent.sortByCorrectCntDesc;
        }
        break;
      case SortBaseEnum.INCORRECT_CNT:
        if(sortDirection === SortDirectionEnum.ASC){
          this.problemSortFunc = SubNavigatorComponent.sortByIncorrectCntAsc;
        }else{
          this.problemSortFunc = SubNavigatorComponent.sortByIncorrectCntDesc;
        }
        break;
    }
    this.tempDataMgrService.refreshProblemList();
  }
  onResetTimerBtnClick(){
    let problemList:Array<ProblemDto>;
    if(this.problemSelector.isProblemSelectMode){
      //문제선택모드라면
      problemList = this.problemSelector.getSelectedProblemList();
    }else{
      problemList = [ this.tempDataMgrService.currProblem ];
    }

    if(!problemList){
      return;
    }
    if(problemList.length <= 0){
      return;
    }
    this.tempDataMgrService.resetTimerOfSelectedProblemList(problemList);
  }
  public static sortByCorrectCntAsc(a: KeyValue<any,ProblemDto>, b: KeyValue<any,ProblemDto>){
    if(a.value.correctCount > b.value.correctCount){
      return 1;
    }else if(a.value.correctCount < b.value.correctCount){
      return -1;
    }else return 0;
  }
  public static sortByCorrectCntDesc(a: KeyValue<any,ProblemDto>, b: KeyValue<any,ProblemDto>){
    if(a.value.correctCount < b.value.correctCount){
      return 1;
    }else if(a.value.correctCount > b.value.correctCount){
      return -1;
    }else return 0;
  }

  public static sortByIncorrectCntAsc(a: KeyValue<any,ProblemDto>, b: KeyValue<any,ProblemDto>){
    if(a.value.incorrectCount > b.value.incorrectCount){
      return 1;
    }else if(a.value.incorrectCount < b.value.incorrectCount){
      return -1;
    }else return 0;
  }

  public static sortByIncorrectCntDesc(a: KeyValue<any,ProblemDto>, b: KeyValue<any,ProblemDto>){
    if(a.value.incorrectCount < b.value.incorrectCount){
      return 1;
    }else if(a.value.incorrectCount > b.value.incorrectCount){
      return -1;
    }else return 0;
  }
}
