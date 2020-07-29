import { Injectable } from '@angular/core';
import {ApiRequesterService} from '../../SocialLogin/api-requester/api-requester.service';
import {RouteCtrlService} from '../../../model/route-ctrl/route-ctrl.service';
import {TempDataMgrService} from '../../../document/temp-data-mgr/temp-data-mgr.service';
import {UserDto} from '../../../model/dto/user.dto';
import {Observable} from 'rxjs';
import {HttpHelper} from '../../../config/http-helper/http-helper';
import {SectionDto} from '../../../model/dto/section.dto';

@Injectable({
  providedIn: 'root'
})
export class SectionRequesterService {

  constructor(
    private apiRequester: ApiRequesterService,
  ) {}

  // 섹션 생성 요청
  public requestCreateSection(sectionDto:SectionDto) :Observable<SectionDto>{
    return new Observable<SectionDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.createSection, sectionDto)
        .subscribe((sectionDto:SectionDto)=>{
          observer.next(sectionDto);
        },(e)=>{
          console.log("SectionRequesterService >> requestCreateSection >> e : ",e);
        });
    });
  }
  // 섹션 삭제 요청
  public requestDeleteSection(sectionDto) :Observable<SectionDto>{
    return new Observable<SectionDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.deleteSection, sectionDto)
        .subscribe(()=>{
          observer.next();
        },(e)=>{
          console.log("SectionRequesterService >> requestDeleteSection >> e : ",e);
        });
    });
  }
  // 섹션 수정 요청
  public requestUpdateSection(sectionDto) :Observable<SectionDto>{
    return new Observable<SectionDto>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.updateSection, sectionDto)
        .subscribe((sectionDto:SectionDto)=>{
          observer.next(sectionDto);
        },(e)=>{
          console.log("SectionRequesterService >> requestUpdateSection >> e : ",e);
        });
    });
  }
  // 섹션 생성 요청
  public requestGetSectionList() :Observable<Array<SectionDto>>{
    return new Observable<Array<SectionDto>>((observer)=>{
      this.apiRequester.processRequest(HttpHelper.api.getSectionList)
        .subscribe((sectionDtoList:Array<SectionDto>)=>{
          observer.next(sectionDtoList);
        },(e)=>{
          console.log("SectionRequesterService >> requestCreateSection >> e : ",e);
        });
    });
  }


}
