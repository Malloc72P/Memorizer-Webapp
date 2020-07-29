import {EventEmitter, Injectable} from '@angular/core';
import {SectionDto} from '../../model/dto/section.dto';
import {ProblemDto} from '../../model/dto/problem.dto';
import {UserDto} from '../../model/dto/user.dto';
import {SectionRequesterService} from '../../Controller/section-requester/section-requester.service';
import {DialogCtrlService} from '../../view/memorizer-dialog/dialog-ctrl/dialog-ctrl.service';
import {AreYouSureDialogData} from '../../view/memorizer-dialog/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {ProblemRequesterService} from '../../Controller/problem-requester/problem-requester.service';
export class DocumentEvent {
  action:DocumentEventEnum;
  data;

  constructor(action: DocumentEventEnum, data) {
    this.action = action;
    this.data = data;
  }
}
export enum DocumentEventEnum{
  CREATE,
  UPDATE,
  DELETE
}
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

  /* 각각의 정보가 변경되는 경우 이벤트를 발생시키는 EventEmitter임 */
  public userDtoEventEmitter:EventEmitter<any>;
  public sectionListEventEmitter:EventEmitter<any>;
  public problemListEventEmitter:EventEmitter<any>;
  public currSectionEventEmitter:EventEmitter<any>;
  public currProblemEventEmitter:EventEmitter<any>;

  /*테스트용 변수임*/
  private idGenerator = 0;

  constructor(
    public sectionRequesterService:SectionRequesterService,
    public problemRequesterService:ProblemRequesterService,
    public dialogCtrlService:DialogCtrlService,
  ) {

    this._sectionList = new Map<any, SectionDto>();
    this._problemList = new Map<any, ProblemDto>();
    this.userDtoEventEmitter = new EventEmitter<any>();
    this.sectionListEventEmitter = new EventEmitter<any>();
    this.problemListEventEmitter = new EventEmitter<any>();
    this.currSectionEventEmitter = new EventEmitter<any>();
    this.currProblemEventEmitter = new EventEmitter<any>();

    this.initSectionEventHandler();
  }

  //초기화 관련 메서드
  initSectionEventHandler(){
    this.sectionListEventEmitter.subscribe((event:DocumentEvent)=>{
    });
    this.currSectionEventEmitter.subscribe((event:DocumentEvent)=>{
      switch (event.action) {
        case DocumentEventEnum.CREATE:
          break;
        case DocumentEventEnum.UPDATE:
          this.resetProblemListWithNoEvent();
          this.getProblemList();
          break;
        case DocumentEventEnum.DELETE:
          break;
      }
    });
  }


  //유저데이터 처리 메서드
  public setUserDto(userDto:UserDto){
    this._userDto = userDto;
    this.userDtoEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, this._userDto ))
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
      this.sectionListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.DELETE, sectionDto));
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
        this.sectionListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, foundSectionDto));
      });
  }
  public addSection( newSection:SectionDto ){
    if (!this.sectionList.has(newSection._id)) {
      this._sectionList.set(newSection._id, newSection);
      this.sectionListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.CREATE, newSection));
    }
    else if(this.sectionList.get(newSection._id).title !== newSection.title){
      this._sectionList.set(newSection._id, newSection);
      this.sectionListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, newSection));
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
      this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.CREATE, newProblem));
    }
    else if(this.problemList.get(newProblem._id).title !== newProblem.title){
      this._problemList.set(newProblem._id, newProblem);
      this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, newProblem));
    }
  }
  //문제 리스트를 불러오는 메서드.
  getProblemList(){
    if (this.currSection && this.currSection._id) {
      this.problemRequesterService.requestGetProblemList(this.currSection._id)
        .subscribe((problemDtoList:Array<ProblemDto>)=>{
          this.addMultipleProblemDto(problemDtoList);
        });
    }
  }
  addMultipleProblemDto(problemDtoList:Array<ProblemDto>){
    for(let problemDto of problemDtoList){
      this.addProblem(problemDto);
    }
  }
  //문제리스트 초기화
  resetProblemListWithNoEvent(){
    if (this.problemList) {
      this.problemList.clear();
    }
  }
  resetProblemList(){
    if (this.problemList) {
      this.problemList.clear();
      this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.DELETE, null));
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
      this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.DELETE, problemDto));
    });
  }
  //문제 맞췄을때랑 틀렸을때
  increaseCorrectCntOfProblem(problemDto:ProblemDto){
    this.problemRequesterService.requestIncreaseCorrectCntOfProblem(problemDto)
      .subscribe((updatedProblemDto:ProblemDto)=>{
        console.log("TempDataMgrService >>  >> updatedProblemDto : ",updatedProblemDto);
        let foundItem = this.problemList.get(updatedProblemDto._id);
        if(foundItem){
          console.log("TempDataMgrService >> increaseCorrectCntOfProblem >> foundItem >> 진입함");
          foundItem.questionedCount = updatedProblemDto.questionedCount;
          foundItem.correctCount = updatedProblemDto.correctCount;
          this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, foundItem));
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
          this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, foundItem));
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
      .subscribe(()=>{
        let foundProblemDto:ProblemDto = this.problemList.get(problemDto._id);
        //아직 TDMS에 있는 섹션객체의 값은 안바뀐 상태이므로, api 수행이 성공하면 이를 바꿔준다.
        if (foundProblemDto) {
          foundProblemDto.title = problemDto.title;
          foundProblemDto.question = problemDto.question;
          foundProblemDto.answer = problemDto.answer;
          foundProblemDto.currQuestionStep = problemDto.currQuestionStep;
          //마지막으로 섹션이 수정되었다는 이벤트를 발생시킴
          this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, foundProblemDto));
        }
      });
  }


  public selectSection(sectionDto:SectionDto){
    this._currSection = sectionDto;
    this.currSectionEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, this._currSection ));
  }
  public selectProblem(problemDto:ProblemDto){
    this._currProblem = problemDto;
    this.currProblemEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, this._currProblem ));
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
}
