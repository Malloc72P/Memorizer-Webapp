import {ProblemDto} from '../../../model/dto/problem.dto';
import {EventEmitter} from '@angular/core';
import {DaseDocumentEvent, DaseDocumentEventEnum} from '../DocumentEvent';

export class ProblemSelector {
  /*문제선택모드에서 선택한 문제목록*/
  private _selectedProblemMap:Map<any, ProblemDto>;
  public problemSelectorEventEmitter:EventEmitter<DaseDocumentEvent>;
  private _isProblemSelectMode:boolean = false;

  constructor() {
    this._selectedProblemMap = new Map<any, ProblemDto>();
    this.problemSelectorEventEmitter = new EventEmitter<DaseDocumentEvent>();
  }

  public addProblem(problemDto:ProblemDto){
    if(!this._selectedProblemMap.has(problemDto._id)){
      this._selectedProblemMap.set(problemDto._id, problemDto);
    }
  }
  public removeProblem(id:string){
    this._selectedProblemMap.delete(id);
  }
  public getSelectedProblemList():Array<ProblemDto>{
    return Array.from(this._selectedProblemMap.values());
  }
  public resetSelectedProblemList(){
    this._selectedProblemMap.clear();
  }

  get selectedProblemMap(): Map<any, ProblemDto> {
    return this._selectedProblemMap;
  }
  activateProblemSelectMode(){
    if (!this._isProblemSelectMode) {
      this._isProblemSelectMode = true;
      this.problemSelectorEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.ACTIVATE_SELECT_MODE, null));
    }
  }
  deactivateProblemSelectMode(){
    if (this._isProblemSelectMode) {
      this._isProblemSelectMode = false;
      this.resetSelectedProblemList();
      this.problemSelectorEventEmitter.emit(new DaseDocumentEvent(DaseDocumentEventEnum.DEACTIVATE_SELECT_MODE, null));
    }
  }
  toggleProblemSelectMode(){
    if (this._isProblemSelectMode) {
      this.deactivateProblemSelectMode();
    }
    else {
      this.activateProblemSelectMode();
    }
  }

  get isProblemSelectMode(): boolean {
    return this._isProblemSelectMode;
  }
}
