import {Component, OnInit} from '@angular/core';
import {AuthRequestService} from '../../controller/SocialLogin/auth-request/auth-request.service';
import {RouteCtrlService} from '../../model/route-ctrl/route-ctrl.service';
import {DiscordRequesterService} from '../../controller/memorizer-controller/discord-requester/discord-requester.service';
import {DiscordUsersDto} from '../../model/dto/discord-users.dto';
import {DialogCtrlService} from '../memorizer-dialog/dialog-ctrl/dialog-ctrl.service';
import {AreYouSureDialogData} from '../memorizer-dialog/main-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {Subscription} from 'rxjs';
import {TempDataMgrService} from '../../document/temp-data-mgr/temp-data-mgr.service';
import {BrowserSizeCalcService} from '../../model/calc-help/browser-size-calc/browser-size-calc.service';

@Component({
  selector: 'app-memorizer-main',
  templateUrl: './memorizer-main.component.html',
  styleUrls: ['./memorizer-main.component.css',
              '../dase-style/color-style.scss']
})
export class MemorizerMainComponent implements OnInit {

  constructor(
    public authRequester:AuthRequestService,
    private discordRequester: DiscordRequesterService,
    private routeCtrlService: RouteCtrlService,
    private dialogCtrlService: DialogCtrlService,
    private tempDataMgrService: TempDataMgrService,
    public browserSizeCalcService: BrowserSizeCalcService,
  ) {
  }
  private subscriptionList:Array<Subscription> = new Array<Subscription>();
  ngOnInit(): void {
    this.authRequester.initUserAuthData().then(()=>{
      //만약 디코 계정연동 시퀀스라면, 아래의 메서드의 로직부분이 실행될 것임
      //아니라면, 아래 메서드로 진입은 하지만 검사부분에서 막혀서 바로 리턴된다
      this.processLinkingDiscordAccount();
    });
  }
  processLinkingDiscordAccount(){
    let isLinkingDiscordSequence = localStorage.getItem("isLinkingDiscordSequence");
    if(isLinkingDiscordSequence && isLinkingDiscordSequence === "y"){
      //디코 연동요청
      //사용자로부터 연동암호를 입력받아야 하므로, 연동암호 입력 패널을 띄우자
      this.dialogCtrlService.openDiscordLinkPwInputDialog().subscribe((activatiionKey)=>{
        if(activatiionKey){
          //연동요청 실시
          let tempDiscordUserDto:DiscordUsersDto = new DiscordUsersDto();
          tempDiscordUserDto._id = localStorage.getItem("discordDataOID");
          tempDiscordUserDto.activationKey = activatiionKey;
          this.discordRequester.requestLinkDiscordAccount(tempDiscordUserDto)
            .subscribe((res)=>{
              //그러면 그 결과를 사용자에게 보여준다
              this.dialogCtrlService.openAreYouSureDialog(new AreYouSureDialogData(
                "디스코드 연동에 성공했어요!","이제 메모라이저가 디코로 문제를 내줄께요!", false
              ));
            },(e)=>{
              console.error("MemorizerMainComponent >> requestLinkDiscordAccount >> e : ",e);
              this.dialogCtrlService.openAreYouSureDialog(new AreYouSureDialogData(
                "디스코드 연동에 실패했어요......","연동암호가 틀렸을 수 도 있어요!", false
                ,["암호가 맞는데도 안되는 경우, 개발자에게 문의해주세요!", "연동을 다시 시도하시려면, 디스코드에 전송된 링크로 재시도해주세요"]
              ));
            });
        }//if(activatiionKey)
      });
    } else
      this.routeCtrlService.goToMainPage();

  }

}
