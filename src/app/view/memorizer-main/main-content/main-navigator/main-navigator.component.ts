import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MainViewActionEvent, MainViewActionEventEnum, MainActionCtrlService} from '../../../../model/main-action-ctrl/main-action-ctrl.service';
import {TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {Subscription} from 'rxjs';
import {SectionRequesterService} from '../../../../controller/memorizer-controller/section-requester/section-requester.service';
import {SectionDto} from '../../../../model/dto/section.dto';
import {ProblemDto} from '../../../../model/dto/problem.dto';
import {ProblemRequesterService} from '../../../../controller/memorizer-controller/problem-requester/problem-requester.service';

@Component({
  selector: 'app-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.css',
    '../../../dase-style/color-style.scss',
    '../../../dase-style/font-style.scss',
  ]
})
export class MainNavigatorComponent implements OnInit, OnDestroy {
  @ViewChild('sidebarIdentifier') sidebarIdentifier: ElementRef;
  private subscriptionList:Array<Subscription> = new Array<Subscription>();

  private downPosX = 0;
  private downPosY = 0;
  constructor(
    public mainViewCtrlService:MainActionCtrlService,
    public tempDataMgrService:TempDataMgrService,
    public sectionApiRequester:SectionRequesterService,
  ) {
    this.initEventHandler();
    this.initSectionData();
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for(let subsc of this.subscriptionList){
      subsc.unsubscribe();
    }
  }

  //초기화 관련 메서드
  initEventHandler(){//이벤트 할당 메서드
    let subsc = this.mainViewCtrlService.mainViewActionEventEmitter
      .subscribe((event:MainViewActionEvent)=>{
        switch (event.action) {
          case MainViewActionEventEnum.NAV_TOGGLE_BTN_CLICKED:
            this.toggleNav();
            break;
          case MainViewActionEventEnum.ACTIVATE_SEARCH_MODE:
            this.resetSearchParams();
            this.onSearchDataChange();
            break;
          case MainViewActionEventEnum.DEACTIVATE_SEARCH_MODE:
            this.resetSearchParams();
            break;
        }
      });

    this.subscriptionList.push(subsc);
  }
  resetSearchParams(){
    this.searchProblemQues = "";
    this.searchProblemTitle = "";
  }
  initSectionData(){//섹션데이터를 요청하는 메서드
    this.sectionApiRequester.requestGetSectionList().subscribe((sectionList:Array<SectionDto>)=>{
      this.tempDataMgrService.createSectionsBySectionList(sectionList);
      let localStorageSectionId = localStorage.getItem("sectionId");
      localStorage.removeItem("sectionId");
      if(localStorageSectionId){
        this.tempDataMgrService.selectSection(this.tempDataMgrService.sectionList.get(localStorageSectionId));
      }
    })
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

  // 검색관련 변수
  // public searchSectionTitle = "";
  public searchProblemTitle = "";
  public searchProblemQues = "";

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
  onSearchDataChange(){
    this.tempDataMgrService.searchProblems(
      this.searchProblemTitle, this.searchProblemQues);

  }
}
