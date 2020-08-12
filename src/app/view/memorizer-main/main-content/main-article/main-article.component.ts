import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgWhiteboardService} from 'ng-whiteboard';
import {DocumentEventEnum, TempDataMgrService} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {DocumentEvent} from '../../../../document/temp-data-mgr/temp-data-mgr.service';
import {Subscription, timer} from 'rxjs';
import {ProblemDto} from '../../../../model/dto/problem.dto';

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
  public waitTimerList:Array<number> = [0,0,0,0,0,0,0,0,0,0];
  public isTimerTerminated = true;
  public countdownTimer = "??시 ??분 ??초 남음";
  constructor(
    private whiteboardService: NgWhiteboardService,
    public tempDataMgrService: TempDataMgrService,
  ) {
  }

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
            this.onCurrProblemChanged();
            break;
          case DocumentEventEnum.DELETE:
            this.isAnswerViewingMode = false;
            break;
        }
    });
    this.subscriptionList.push(subscription);
    subscription = this.tempDataMgrService.problemListEventEmitter
      .subscribe((event:DocumentEvent)=>{
        switch (event.action) {
          case DocumentEventEnum.CREATE:
            break;
          case DocumentEventEnum.UPDATE:
            let updatedProblemDto:ProblemDto = event.data;
            if(updatedProblemDto._id === this.tempDataMgrService.currProblem){

            }
            break;
          case DocumentEventEnum.DELETE:
            break;
        }
      });
  }
  onCurrProblemChanged(){
    this.tempDataMgrService.getTimerStepList()
      .then((waitTimerList)=>{
        this.waitTimerList = waitTimerList;

        console.log("waitTimerList : ",this.waitTimerList);

        this.getCountdownTimer();

        let tempInterval = setInterval(()=>{
            let remainTime = this.getCountdownTimer();
            if(remainTime < 0){
              this.isTimerTerminated = true;
            }
          },900);
      });
  }
  getCountdownTimer(){
    let remainTime = this.tempDataMgrService.getQuestionWaitTime(this.tempDataMgrService.currProblem);
    console.log("remainTime : ", remainTime);

    if(remainTime > 0){
      this.isTimerTerminated = false;
    }
    this.countdownTimer = this.getRemainTime(remainTime);
    return remainTime;
  }
  getRemainTime(milliseconds:number){
    /*
    1s = 1000ms
    1m = 60s
    1h = 60m
    */
    console.log(`wait`)
    let currStep:number;
    let hours, minute, seconds;

    //시간 계산
    hours = Math.floor(milliseconds / ( 60 * 60 * 1000 ));
    milliseconds -= hours * ( 60 * 60 * 1000 );
    //분 계산
    minute = Math.floor(milliseconds / ( 60 * 1000 ));
    milliseconds -= minute * ( 60 * 1000 );
    //초 계산
    seconds = Math.floor(milliseconds / ( 1000 ));

    let result = `${hours.toFixed(0)}시간 ${minute.toFixed(0)}분 ${seconds.toFixed(0)}초`;
    console.log(`result : ${result}`)
    return result;
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
