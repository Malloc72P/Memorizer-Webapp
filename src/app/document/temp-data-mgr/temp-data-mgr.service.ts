import {EventEmitter, Injectable} from '@angular/core';
import {SectionDto} from '../../model/dto/section.dto';
import {ProblemDto} from '../../model/dto/problem.dto';
import {UserDto} from '../../model/dto/user.dto';
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
  private _userDto = null;
  /*섹션 네비바에 출력될 정보임*/
  private _sectionList:Array<SectionDto>;
  /*문제 네비바에 출력될 정보임*/
  private _problemList:Array<ProblemDto>;
  /*현재 선택된 섹션임*/
  private _currSection:SectionDto;
  /*현재 선택된 문제임*/
  private _currProblem:ProblemDto;

  /* 각각의 정보가 변경되는 경우 이벤트를 발생시키는 EventEmitter임 */
  public userDtoEventEmitter:EventEmitter<any>;
  public sectionListEventEmitter:EventEmitter<any>;
  public problemListEventEmitter:EventEmitter<any>;
  public currSectionEventEmitter:EventEmitter<any>;
  public currProblemEventEmitter:EventEmitter<any>;

  /*테스트용 변수임*/
  private idGenerator = 0;

  constructor() {

    this._sectionList = new Array<SectionDto>();
    this._problemList = new Array<ProblemDto>();
    this.userDtoEventEmitter = new EventEmitter<any>();
    this.sectionListEventEmitter = new EventEmitter<any>();
    this.problemListEventEmitter = new EventEmitter<any>();
    this.currSectionEventEmitter = new EventEmitter<any>();
    this.currProblemEventEmitter = new EventEmitter<any>();

    /*let tempUserDto = new UserDto();
    tempUserDto.idToken = 1;
    tempUserDto.userName = "ayana";
    tempUserDto.authToken = 1;
    this._userDto = tempUserDto;*/

    let newSection1 = new SectionDto();
    newSection1._id = this.getId();
    newSection1.title = "에밀리아";
    this.sectionList.push(newSection1);

    let newSection2 = new SectionDto();
    newSection2._id = this.getId();
    newSection2.title = "프레데리카";
    this.sectionList.push(newSection2);

    let newSection3 = new SectionDto();
    newSection3._id = this.getId();
    newSection3.title = "램";
    this.sectionList.push(newSection3);

    let newProblem1 = new ProblemDto();
    newProblem1._id = this.getId();
    newProblem1.title = "EMT란?";
    newProblem1.question = "에밀리아는 천사인가요?";
    newProblem1.answer = "네";
    newProblem1.createdDate = new Date();
    this.problemList.push(newProblem1);
  }
  public createSection( newSection:SectionDto ){
    this._sectionList.push(newSection);
    this.sectionListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.CREATE, newSection ));
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

  get sectionList(): Array<SectionDto> {
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
