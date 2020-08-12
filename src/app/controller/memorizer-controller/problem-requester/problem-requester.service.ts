import { Injectable } from '@angular/core';
import {ApiRequesterService} from '../../SocialLogin/api-requester/api-requester.service';
import {Observable} from 'rxjs';
import {HttpHelper} from '../../../config/http-helper/http-helper';
import {ProblemDto} from '../../../model/dto/problem.dto';

@Injectable({
  providedIn: 'root'
})
export class ProblemRequesterService {


  constructor(
    private apiRequester: ApiRequesterService,
  ) {}

  // 문제 생성 요청
  public requestCreateProblem(problemDto:ProblemDto) :Observable<ProblemDto>{
    return new Observable<ProblemDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.createProblem, problemDto)
        .subscribe((problemDto:ProblemDto)=>{
          observer.next(problemDto);
        },(e)=>{
          console.log("ProblemRequesterService >> requestCreateProblem >> e : ",e);
        });
    });
  }
  // 문제 삭제 요청
  public requestDeleteProblem(problemDto) :Observable<ProblemDto>{
    return new Observable<ProblemDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.deleteProblem, problemDto)
        .subscribe(()=>{
          observer.next();
        },(e)=>{
          console.log("ProblemRequesterService >> requestDeleteProblem >> e : ",e);
        });
    });
  }
  // 문제 수정 요청
  public requestUpdateProblem(problemDto) :Observable<ProblemDto>{
    return new Observable<ProblemDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.updateProblem, problemDto)
        .subscribe((problemDto:ProblemDto)=>{
          observer.next(problemDto);
        },(e)=>{
          console.log("ProblemRequesterService >> requestUpdateProblem >> e : ",e);
        });
    });
  }
  // 문제 맞췄을때 보내는 요청
  public requestIncreaseCorrectCntOfProblem(problemDto) :Observable<ProblemDto>{
    return new Observable<ProblemDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.increaseCorrectCntOfProblem, problemDto)
        .subscribe((problemDto:ProblemDto)=>{
          observer.next(problemDto);
        },(e)=>{
          console.log("ProblemRequesterService >> requestIncreaseCorrectCntOfProblem >> e : ",e);
        });
    });
  }
  // 문제 틀렸을때 보내는 요청
  public requestIncreaseIncorrectCntOfProblem(problemDto) :Observable<ProblemDto>{
    return new Observable<ProblemDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.increaseIncorrectCntOfProblem, problemDto)
        .subscribe((problemDto:ProblemDto)=>{
          observer.next(problemDto);
        },(e)=>{
          console.log("ProblemRequesterService >> requestIncreaseIncorrectCntOfProblem >> e : ",e);
        });
    });
  }
  // 문제 가져오기 요청
  public requestGetProblemList(sectionId) :Observable<Array<ProblemDto>>{
    return new Observable<Array<ProblemDto>>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.getProblemList, {'sectionId' : sectionId})
        .subscribe((problemDtoList:Array<ProblemDto>)=>{
          observer.next(problemDtoList);
        },(e)=>{
          console.log("ProblemRequesterService >> requestGetProblemList >> e : ",e);
        });
    });
  }
  // 문제 검색 요청
  public requestSearchProblemList(problemTitle, problemQuestion) :Observable<Array<ProblemDto>>{
    return new Observable<Array<ProblemDto>>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.getProblemList,
        {'problemTitle' : problemTitle, 'problemQuestion' : problemQuestion})
        .subscribe((problemDtoList:Array<ProblemDto>)=>{
          observer.next(problemDtoList);
        },(e)=>{
          console.log("ProblemRequesterService >> requestSearchProblemList >> e : ",e);
        });
    });
  }
  // 문제 검색 요청
  public getTimerStepList() :Observable<Array<number>>{
    return new Observable<Array<number>>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.timerStepListProblem)
        .subscribe((timerStepList:Array<number>)=>{
          observer.next(timerStepList);
        },(e)=>{
          console.log("ProblemRequesterService >> getTimerStepList >> e : ",e);
        });
    });
  }

}
