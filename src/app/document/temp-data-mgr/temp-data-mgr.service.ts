import {EventEmitter, Injectable} from '@angular/core';
import {SectionDto} from '../../model/dto/section.dto';
import {ProblemDto} from '../../model/dto/problem.dto';
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
  private userDto;
  private _sectionList:Array<SectionDto>;
  private _problemList:Array<ProblemDto>;
  public userDtoEventEmitter:EventEmitter<any>;
  public sectionListEventEmitter:EventEmitter<any>;
  public problemListEventEmitter:EventEmitter<any>;
  constructor() {
    this._sectionList = new Array<SectionDto>();
    this._problemList = new Array<ProblemDto>();
    this.userDtoEventEmitter = new EventEmitter<any>();
    this.sectionListEventEmitter = new EventEmitter<any>();
    this.problemListEventEmitter = new EventEmitter<any>();

    let newSection1 = new SectionDto();
    newSection1.title = "에밀리아";
    this.sectionList.push(newSection1);

    let newSection2 = new SectionDto();
    newSection2.title = "프레데리카";
    this.sectionList.push(newSection2);

    let newSection3 = new SectionDto();
    newSection3.title = "램";
    this.sectionList.push(newSection3);
  }
  public createSection( newSection:SectionDto ){
    this._sectionList.push(newSection);
    this.sectionListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.CREATE, newSection ));
  }
  createProblem( newProblem:ProblemDto ){
    this._problemList.push(newProblem);
    this.problemListEventEmitter.emit(new DocumentEvent(DocumentEventEnum.CREATE, newProblem ));
  }


  get sectionList(): Array<SectionDto> {
    return this._sectionList;
  }

  get problemList(): Array<ProblemDto> {
    return this._problemList;
  }
}
