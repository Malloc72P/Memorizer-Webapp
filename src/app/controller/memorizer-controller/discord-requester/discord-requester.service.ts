import {Injectable} from '@angular/core';
import {ApiRequesterService} from '../../SocialLogin/api-requester/api-requester.service';
import {Observable} from 'rxjs';
import {DiscordUsersDto} from '../../../model/dto/discord-users.dto';
import {HttpHelper} from '../../../config/http-helper/http-helper';
import {ControllerEvent, ControllerEventEnum, ControllerEventMgrService} from '../../controller-event-mgr/controller-event-mgr.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscordRequesterService {

  constructor(
    private apiRequester: ApiRequesterService,
  ) {
  }
// 문제 수정 요청
  public requestLinkDiscordAccount(discordUsersDto:DiscordUsersDto) :Observable<DiscordUsersDto>{
    return new Observable<DiscordUsersDto>((observer)=>{
      localStorage.removeItem("isLinkingDiscordSequence");
      localStorage.removeItem("discordDataOID");
      this.apiRequester.processRequest(HttpHelper.api.linkDiscordAccount, discordUsersDto)
        .subscribe((discordUsersDto:DiscordUsersDto)=>{
          //성공적으로 링킹했으니 임시데이터를 초기화함
          observer.next(discordUsersDto);
        },(e:HttpErrorResponse)=>{
          console.log("DiscordRequesterService >> requestLinkDiscordAccount >> e : ",e);
          observer.error(e.error);
        });
    });
  }
}
