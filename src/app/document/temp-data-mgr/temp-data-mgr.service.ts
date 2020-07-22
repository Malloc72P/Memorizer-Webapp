import {EventEmitter, Injectable} from '@angular/core';
import {SectionDto} from '../../model/dto/section.dto';
import {ProblemDto} from '../../model/dto/problem.dto';
import {UserDto} from '../../model/dto/user.dto';
import {SectionRequesterService} from '../../Controller/section-requester/section-requester.service';
import {DialogCtrlService} from '../../model/dialog-ctrl/dialog-ctrl.service';
import {AreYouSureDialogData} from '../../view/memorizer-main/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
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
  private _problemList:Array<ProblemDto>;
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
    public dialogCtrlService:DialogCtrlService,
  ) {

    this._sectionList = new Map<any, SectionDto>();
    this._problemList = new Array<ProblemDto>();
    this.userDtoEventEmitter = new EventEmitter<any>();
    this.sectionListEventEmitter = new EventEmitter<any>();
    this.problemListEventEmitter = new EventEmitter<any>();
    this.currSectionEventEmitter = new EventEmitter<any>();
    this.currProblemEventEmitter = new EventEmitter<any>();

    this.initSectionEventHandler();

    /*let tempUserDto = new UserDto();
    tempUserDto.idToken = 1;
    tempUserDto.userName = "ayana";
    tempUserDto.authToken = 1;
    this._userDto = tempUserDto;*/

    let newProblem1 = new ProblemDto();
    newProblem1._id = this.getId();
    newProblem1.title = "EMT란?";
    newProblem1.question = "에밀리아는 천사인가요?";
    newProblem1.answer = "네";
    newProblem1.createdDate = new Date();
    this.problemList.push(newProblem1);
  }

  //초기화 관련 메서드
  initSectionEventHandler(){
    this.sectionListEventEmitter.subscribe((event:DocumentEvent)=>{
    });
  }


  //유저데이터 처리 메서드
  public setUserDto(userDto:UserDto){
    this._userDto = userDto;
    this.userDtoEventEmitter.emit(new DocumentEvent(DocumentEventEnum.UPDATE, this._userDto ))
  }
  //섹션, 문제 데이터 처리 메서드
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
  public createProblem( newProblem:ProblemDto ){
    this._problemList.push(newProblem);
    this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.CREATE, newProblem ));
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

  get problemList(): Array<ProblemDto> {
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
