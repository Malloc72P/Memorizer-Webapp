import {UserDto} from '../../../../model/dto/user.dto';

export enum AuthEventEnum {
  SIGN_OUT,
  SIGN_IN
}

export class AuthEvent {
  public action:AuthEventEnum;
  public userInfo:UserDto;

  constructor(action: AuthEventEnum, userInfo: UserDto) {
    this.action = action;
    this.userInfo = userInfo;
  }
}
