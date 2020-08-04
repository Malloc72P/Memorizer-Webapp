import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgWhiteboardService} from 'ng-whiteboard';
import {DocumentEventEnum, TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {DocumentEvent} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-article',
  templateUrl: './main-article.component.html',
  styleUrls: ['./main-article.component.css', '../../../dase-style/color-style.scss', '../../../dase-style/toolbar-style.css']
})
export class MainArticleComponent implements OnInit, OnDestroy {
  public currInputerMode = "whiteboard";
  public brushSize = 0.3;
  public isAnswerViewingMode = false;
  private subscriptionList:Array<Subscription> = new Array<Subscription>();
  constructor(
    private whiteboardService: NgWhiteboardService,
    public tempDataMgrService: TempDataMgrService,
  ) { }

  ngOnInit(): void {
    this.onTdmsEvent();
  }
  ngOnDestroy() {
    if(this.subscriptionList){
      for(let subscription of this.subscriptionList){
        subscription.unsubscribe();
      }
    }
  }

  //TDMS관련 이벤트 처리
  onTdmsEvent(){
    let subscription = this.tempDataMgrService.currProblemEventEmitter
      .subscribe((event:DocumentEvent)=>{
        switch (event.action) {
          case DocumentEventEnum.UPDATE:
            this.isAnswerViewingMode = false;
            break;
          case DocumentEventEnum.DELETE:
            this.isAnswerViewingMode = false;
            break;
        }
    });
    this.subscriptionList.push(subscription);
  }

  //문제풀이관련 메서드
  onCorrectBtnClicked(){
    this.tempDataMgrService.increaseCorrectCntOfProblem(this.tempDataMgrService.currProblem);
  }
  onIncorrectBtnClicked(){
    this.tempDataMgrService.increaseIncorrectCntOfProblem(this.tempDataMgrService.currProblem);
  }

  /*화이트보드 동작제어 메서드*/
  clear(){
    this.whiteboardService.erase();
  }
  redoWb(){
    this.whiteboardService.redo();
  }
  undoWb(){
    this.whiteboardService.undo();
  }
  saveWb(){

  }

  /*화이트보드 크기조절 부분 로직*/
  @ViewChild('wbCanvas') wbCanvas: ElementRef;
  onPointerDown(event){
    this.isDragging = true;
  }
  public wbHeight = 420;
  resizeSidebar(event){
    // console.log("MainArticleComponent >> resizeSidebar >> event : ",event);
    let wbCanvasEl:HTMLElement = this.wbCanvas.nativeElement;
    let newHeight = event.y - wbCanvasEl.offsetTop;
    if (420 < newHeight && newHeight < 800) {
      this.wbHeight = newHeight;
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
  @HostListener('document:keydown', ['$event']) onKeyDown(e){
    // console.log("MainArticleComponent >> onkeydown >> e : ",e);
    switch (e.code) {
      case "KeyZ":
        if(e.ctrlKey && !e.shiftKey){
          //undo 단축키
          this.undoWb();
          this.preventDefault(e);
        }
        else if(e.ctrlKey && e.shiftKey){
          //redo 단축키
          this.redoWb()
          this.preventDefault(e);
        }
        break;
      case "KeyR":
        if(e.ctrlKey && e.shiftKey){
          //리셋 단축키
          this.clear();
          this.preventDefault(e);
        }
    }
  }
  preventDefault(e){
    e.preventDefault();
  }

}
