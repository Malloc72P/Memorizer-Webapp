import {EventEmitter, Injectable} from '@angular/core';
import {SectionDto} from '../../model/dto/section.dto';
import {ProblemDto} from '../../model/dto/problem.dto';
import {UserDto} from '../../model/dto/user.dto';
import {SectionRequesterService} from '../../controller/memorizer-controller/section-requester/section-requester.service';
import {DialogCtrlService} from '../../view/memorizer-dialog/dialog-ctrl/dialog-ctrl.service';
import {AreYouSureDialogData} from '../../view/memorizer-dialog/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {ProblemRequesterService} from '../../controller/memorizer-controller/problem-requester/problem-requester.service';
import {DaseDocumentEvent, DaseDocumentEventEnum} from './DocumentEvent';
import {ProblemSelector} from './ProblemSelector/ProblemSelector';
import * as BezierEasing from 'bezier-easing';



@Injectable({
  providedIn: 'root'
})
export class TempDataMgrService {
  /*현재 로그인된 계정주인의 정보가 여기에 저장됨*/
  private _userDto:UserDto = null;
  /*섹션 네비바에 출력될 정보임*/
  private _sectionList:Map<any, SectionDto>;
  /*문제 네비바에 출력될 정보임*/
  private _problemList:Map<any, ProblemDto>;
  /*현재 선택된 섹션임*/
  private _currSection:SectionDto = null;
  /*현재 선택된 문제임*/
  private _currProblem:ProblemDto = null;
  /*메모라이저가 다음 문제를 내기까지 대기하는 시간을 담은 배열*/
  private _timerStepList:Array<number> = null;
  /*문제선택기능을 담당하는 클래스*/
  public problemSelector:ProblemSelector;

  /* 각각의 정보가 변경되는 경우 이벤트를 발생시키는 EventEmitter임 */
  public userDtoEventEmitter:EventEmitter<DaseDocumentEvent>;
  public sectionListEventEmitter:EventEmitter<DaseDocumentEvent>;
  public problemListEventEmitter:EventEmitter<DaseDocumentEvent>;
  public currSectionEventEmitter:EventEmitter<DaseDocumentEvent>;
  public currProblemEventEmitter:EventEmitter<DaseDocumentEvent>;
  public timerStepListEventEmitter:EventEmitter<DaseDocumentEvent>;
  public debugEventEmitter:EventEmitter<DaseDocumentEvent>;

  /*테스트용 변수임*/
  private idGenerator = 0;

  constructor(
    public sectionRequesterService:SectionRequesterService,
    public problemRequesterService:ProblemRequesterService,
    public dialogCtrlService:DialogCtrlService,
  ) {

    this._sectionList = new Map<any, SectionDto>();
    this._problemList = new Map<any, ProblemDto>();

    this.userDtoEventEmitter = new EventEmitter<DaseDocumentEvent>();
    this.sectionListEventEmitter = new EventEmitter<DaseDocumentEvent>();
    this.problemListEventEmitter = new EventEmitter<DaseDocumentEvent>();
    this.currSectionEventEmitter = new EventEmitter<DaseDocumentEvent>();
    this.currProblemEventEmitter = new EventEmitter<DaseDocumentEvent>();
    this.timerStepListEventEmitter = new EventEmitter<DaseDocumentEvent>();
    this.debugEventEmitter = new EventEmitter<DaseDocumentEvent>();

    this.problemSelector = new ProblemSelector();

    this.initSectionEventHandler();
    this.initProblemEventHandler();
    this.initDebugEventHandler();
    this.getTimerStepList();
  }

  getTimerStepList() :Promise<Array<number>>{
    return new Promise<Array<number>>((resolve)=>{
      if (!this._timerStepList) {
        this.problemRequesterService.getTimerStepList().subscribe((timerStepList: Array<number>) => {
          this._timerStepList = timerStepList;
          resolve(this._timerStepList);
        });//subscribe
      }else{
        resolve(this._timerStepList);
      }
    });
  }

  //초기화 관련 메서드
  initSectionEventHandler(){
    this.sectionListEventEmitter.subscribe((event:DaseDocumentEvent)=>{
    });
    this.currSectionEventEmitter.subscribe((event:DaseDocumentEvent)=>{
      switch (event.action) {
        case DaseDocumentEventEnum.CREATE:
          break;
        case DaseDocumentEventEnum.UPDATE:
          this.resetProblemListWithNoEvent();

          this.getProblemList().then((problemDtoList:Array<ProblemDto>)=>{
            let lsProblemId = localStorage.getItem("problemId");
            localStorage.removeItem("problemId");
            if(lsProblemId){
              let foundProblemDto:ProblemDto = this.problemList.get(lsProblemId);
              if(foundProblemDto){
                this.selectProblem(foundProblemDto);
              }
            }
          });
          break;
        case DaseDocumentEventEnum.DELETE:
          break;
      }
    });
  }
  initProblemEventHandler(){
    this.problemListEventEmitter.subscribe((event:DaseDocumentEvent)=>{
      switch (event.action) {
        case DaseDocumentEventEnum.CREATE:
        case DaseDocumentEventEnum.UPDATE:
        case DaseDocumentEventEnum.DELETE:
          this.refreshProblemList();
      }
    });
    //문제선택기능을 위한 이벤트 핸들러 등록
    this.currProblemEventEmitter.subscribe((event:DaseDocumentEvent)=>{
      if (event.action === DaseDocumentEventEnum.UPDATE && this.problemSelector.isProblemSelectMode) {
        this.problemSelector.addProblem(this._currProblem);
        // this._currProblem = null;
      }
    })
    this.problemSelector.problemSelectorEventEmitter.subscribe((event:DaseDocumentEvent)=>{
      if(event.action === DaseDocumentEventEnum.ACTIVATE_SELECT_MODE){
        this.deselectProblem();
      }
    });
  }
  initDebugEventHandler(){
    this.debugEventEmitter.subscribe(()=>{
      //console.log("TempDataMgrService >> debug >> currProblem : ",this.currProblem);
      let easing = BezierEasing(0,1.38,.59,.92);
      let length = 100;
      for (let i = 1 ; i <= length; i++){
        console.log(`easing[${i}] \t \t : ${easing(i/100).toFixed(2)}`);
      }
    });
  }
  //유저데이터 처리 메서드
  public setUserDto(userDto:UserDto){
    this._userDto = userDto;
    this.userDtoEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, this._userDto ))
  }
  //섹션 데이터 처리 메서드
  public isValidSection(sectionDto:SectionDto){
    return this.sectionList.has(sectionDto._id);
  }
  public showSectionModifyErrorPanel(){
    this.dialogCtrlService.openAreYouSureDialog(new AreYouSureDialogData(
      "수행할 수 없는 명령입니다.", "존재하지 않는 섹션입니다.", false
    )).subscribe(()=>{});
  }
  public createSectionsBySectionList(sectionList:Array<SectionDto>){
    for (let sectionDto of sectionList){
      this.addSection(sectionDto);
    }
  }
  public createSection(newSectionTitle){
    let newSectionDto:SectionDto = new SectionDto();
    newSectionDto.title = newSectionTitle;

      this.sectionRequesterService.requestCreateSection(newSectionDto)
        .subscribe((createdSection:SectionDto)=>{
          this.addSection(createdSection);
    });
  }
  public deleteSection(sectionDto:SectionDto){
    //존재하지 않는 섹션이라면 수행하지 않는다.
    if(!this.isValidSection(sectionDto)){
      this.showSectionModifyErrorPanel();
      return;
    }

    this.sectionRequesterService.requestDeleteSection(sectionDto).subscribe(()=>{
      if(this.currSection && this.currSection._id === sectionDto._id){
        this._currSection = null;
      }
      //섹션을 삭제함.
      this.sectionList.delete(sectionDto._id);
      //마지막으로 섹션이 삭제되었다는 이벤트를 발생시킴
      this.sectionListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.DELETE, sectionDto));
    });
  }
  public updateSection(sectionDto:SectionDto){
    //존재하지 않는 섹션이라면 수행하지 않는다.
    if(!this.isValidSection(sectionDto)){
      this.showSectionModifyErrorPanel();
      return;
    }
    this.sectionRequesterService.requestUpdateSection(sectionDto)
      .subscribe(()=>{
        let foundSectionDto:SectionDto = this.sectionList.get(sectionDto._id);
        //아직 TDMS에 있는 섹션객체의 값은 안바뀐 상태이므로, api 수행이 성공하면 이를 바꿔준다.
        foundSectionDto.title = sectionDto.title;
        //마지막으로 섹션이 수정되었다는 이벤트를 발생시킴
        this.sectionListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, foundSectionDto));
      });
  }
  public addSection( newSection:SectionDto ){
    if (!this.sectionList.has(newSection._id)) {
      this._sectionList.set(newSection._id, newSection);
      this.sectionListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.CREATE, newSection));
    }
    else if(this.sectionList.get(newSection._id).title !== newSection.title){
      this._sectionList.set(newSection._id, newSection);
      this.sectionListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, newSection));
    }
  }

  //문제 데이터 처리 메서드
  public isValidProblem(problemDto:ProblemDto){
    return this.problemList.has(problemDto._id);
  }
  public showProblemModifyErrorPanel(){
    this.dialogCtrlService.openAreYouSureDialog(new AreYouSureDialogData(
      "수행할 수 없는 명령입니다.", "존재하지 않는 문제입니다.", false
    )).subscribe(()=>{});
  }


  public createProblem( newProblem:ProblemDto, sectionId ){
    newProblem.belongingSectionId = sectionId;
    this.problemRequesterService.requestCreateProblem(newProblem)
      .subscribe((createdProblemDto:ProblemDto)=>{
      this.addProblem(createdProblemDto);
    });
  }

  public addProblem(newProblem:ProblemDto){
    if (!this.problemList.has(newProblem._id)) {
      this._problemList.set(newProblem._id, newProblem);
      this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.CREATE, newProblem));
    }
    else if(this.problemList.get(newProblem._id).title !== newProblem.title){
      this._problemList.set(newProblem._id, newProblem);
      this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, newProblem));
    }
  }
  public addProblemWithNoEvent(newProblem:ProblemDto){
    if (!this.problemList.has(newProblem._id)) {
      this._problemList.set(newProblem._id, newProblem);
    }
    else if(this.problemList.get(newProblem._id).title !== newProblem.title){
      this._problemList.set(newProblem._id, newProblem);
    }
  }

  //문제 리스트를 불러오는 메서드.
  getProblemList() :Promise<Array<ProblemDto>>{
    return new Promise<Array<ProblemDto>>((resolve, reject)=>{
      if (this.currSection && this.currSection._id) {
        this.problemRequesterService.requestGetProblemList(this.currSection._id)
          .subscribe((problemDtoList:Array<ProblemDto>)=>{
            this.resetProblemListWithNoEvent();
            this.addMultipleProblemDto(problemDtoList);
            resolve(problemDtoList);
          });
      }
    });
  }
  addMultipleProblemDto(problemDtoList:Array<ProblemDto>){
    for(let problemDto of problemDtoList){
      this.addProblem(problemDto);
    }
    this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.CREATE, null));
  }
  //문제리스트 초기화
  //초기화는 시키지만, problemListEventEmitter를 이용한 이벤트는 발생시키지 않는다.
  //problemList의 값을 수정하는 마지막 지점이기 때문임.
  //이 작업으로 인해 다른 옵저버가 처리를 수행해서는 안될 때, withNoEvent시리즈 메서드를 쓴다.
  resetProblemListWithNoEvent(){
    if (this.problemList) {
      this.problemList.clear();
    }
    this.resetCurrProblemWithNoEvent();
  }
  resetCurrProblemWithNoEvent(){
    if(this.currProblem){
      this._currProblem = null;
    }
  }
  resetProblemList(){
    if (this.problemList) {
      this.problemList.clear();
      this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.DELETE, null));
    }
  }
  //문제 삭제
  deleteProblem(problemDto:ProblemDto){
    if(!this.isValidProblem(problemDto)){
      this.showSectionModifyErrorPanel();
      return;
    }

    this.problemRequesterService.requestDeleteProblem(problemDto).subscribe(()=>{
      if(this.currProblem && this.currProblem._id === problemDto._id){
        this._currSection = null;
      }
      //문제를 삭제함.
      this.problemList.delete(problemDto._id);
      //마지막으로 문제가 삭제되었다는 이벤트를 발생시킴
      this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.DELETE, problemDto));
    });
  }
  //문제 맞췄을때랑 틀렸을때
  increaseCorrectCntOfProblem(problemDto:ProblemDto){
    this.problemRequesterService.requestIncreaseCorrectCntOfProblem(problemDto)
      .subscribe((updatedProblemDto:ProblemDto)=>{
        let foundItem = this.problemList.get(updatedProblemDto._id);
        if(foundItem){
          foundItem.questionedCount = updatedProblemDto.questionedCount;
          foundItem.correctCount = updatedProblemDto.correctCount;
          this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, foundItem));
        }
    });
  }
  increaseIncorrectCntOfProblem(problemDto:ProblemDto){
    this.problemRequesterService.requestIncreaseIncorrectCntOfProblem(problemDto)
      .subscribe((updatedProblemDto:ProblemDto)=>{
        let foundItem = this.problemList.get(updatedProblemDto._id);
        if(foundItem){
          foundItem.questionedCount = updatedProblemDto.questionedCount;
          foundItem.incorrectCount = updatedProblemDto.incorrectCount;
          this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, foundItem));
        }
      })
  }
  //문제 수정
  public updateProblem(problemDto:ProblemDto){
    //존재하지 않는 섹션이라면 수행하지 않는다.
    if(!this.isValidProblem(problemDto)){
      this.showProblemModifyErrorPanel();
      return;
    }
    this.problemRequesterService.requestUpdateProblem(problemDto)
      .subscribe((updatedProblemDto:ProblemDto)=>{
        let foundProblemDto:ProblemDto = this.problemList.get(problemDto._id);
        //아직 TDMS에 있는 섹션객체의 값은 안바뀐 상태이므로, api 수행이 성공하면 이를 바꿔준다.
        if (foundProblemDto) {
          foundProblemDto.title = updatedProblemDto.title;
          foundProblemDto.question = updatedProblemDto.question;
          foundProblemDto.answer = updatedProblemDto.answer;
          if (foundProblemDto.currQuestionStep !== updatedProblemDto.currQuestionStep) {
            foundProblemDto.recentlyQuestionedDate = updatedProblemDto.recentlyQuestionedDate;
          }
          foundProblemDto.currQuestionStep = updatedProblemDto.currQuestionStep;
          //마지막으로 섹션이 수정되었다는 이벤트를 발생시킴
          this.problemListEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, foundProblemDto));
        }
      });
  }


  public selectSection(sectionDto:SectionDto){
    if (sectionDto) {
      this._currSection = sectionDto;
      this.currSectionEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, this._currSection));
    }
  }
  public selectProblem(problemDto:ProblemDto){
    if (problemDto) {
      this._currProblem = problemDto;
      this.currProblemEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.UPDATE, this._currProblem));
    }
  }
  public deselectProblem(){
    if (this._currProblem) {
      let prevCurrProblem = this._currProblem;
      this._currProblem = null;
      this.currProblemEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.DELETE, prevCurrProblem));
    }
  }

  public searchProblems(problemTitle, problemQuestion){
    this.problemRequesterService.requestSearchProblemList(problemTitle, problemQuestion)
      .subscribe((searchResult:Array<ProblemDto>)=>{
        this.resetProblemListWithNoEvent();
        this.addMultipleProblemDto(searchResult);
      });
  }
  public refreshProblemList(){
    this._problemList.set("temp", new ProblemDto("","","","","","","","","","","",""));
    // this._problemList.delete("temp");
  }
  public resetTimerOfSelectedProblemList(problemList:Array<ProblemDto>){
    this.problemRequesterService.requestResetProblemsTimer(problemList)
      .subscribe((updatedList:Array<ProblemDto>)=>{
        for (let currProblem of updatedList){
          let foundProblem:ProblemDto = this.problemList.get(currProblem._id);
          if(foundProblem){
            foundProblem.recentlyQuestionedDate = currProblem.recentlyQuestionedDate;
          }
        }
        this.problemSelector.deactivateProblemSelectMode();
        this.dialogCtrlService.openAreYouSureDialog(
          new AreYouSureDialogData("처리가 완료되었습니다." ,
            "선택하신 모든 문제의 타이머를 재시작했어요.",
            true)).subscribe(()=>{
           //확인패널 닫힌 후
        });
      });//api 요청
  }

  //문제출제까지 남은 시간을 계산하여 리턴하는 메서드
  public getQuestionWaitTime(problemDto:ProblemDto){
    if(!problemDto){
      return -1;
    }
    let timerValue = 0;//문제 출제까지 대기해야 하는 시간
    if(problemDto.currQuestionStep >= 10){
      timerValue = this._timerStepList[9];
    }else{
      timerValue = this.timerStepList[problemDto.currQuestionStep];
    }
    let currTime = new Date();
    //recently Questioned Date. 최근 문제출제한 시간 값
    let rQD = new Date(problemDto.recentlyQuestionedDate);
    // let waitTime = rQD + timerValue - currTime;
    let waitTime = rQD.getTime() + timerValue - currTime.getTime();
    return waitTime;
  }


  get userDto() {
    return this._userDto;
  }


  get sectionList(): Map<any, SectionDto> {
    return this._sectionList;
  }

  get problemList(): Map<any, ProblemDto> {
    return this._problemList;
  }

  get currSection(): SectionDto {
    return this._currSection;
  }

  get currProblem(): ProblemDto {
    return this._currProblem;
  }
  private getId(){
    return this.idGenerator++;
  }

  get timerStepList(): Array<number> {
    return this._timerStepList;
  }

}
