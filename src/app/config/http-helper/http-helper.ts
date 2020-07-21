import * as ServerSetting from './ServerSetting.json';

class ApiRequest {
  constructor(url, requestType){
    this.uri = url;
    this.requestType = requestType;
  }
  public uri: string;
  public requestType: ApiRequestTypeEnum;
}
export enum ApiRequestTypeEnum {
  GET,
  POST,
  PATCH,
  DELETE,
  REDIRECT,
}


export class HttpHelper {
  private static readonly ngDomainName        =   ServerSetting.ngDomain;
  private static readonly ngPort              =   ServerSetting.ngPort;
  private static readonly apiServerDomainName =   ServerSetting.apiDomain;
  private static readonly apiServerPort       =   ServerSetting.apiPort;
  // private static readonly apiServerPort       =   ":5858";
  private static readonly contentType         =   ServerSetting.contentType;
  private static readonly tokenType           =   ServerSetting.tokenType;

  public static readonly ngUrl   =   HttpHelper.ngDomainName + HttpHelper.ngPort;
  public static readonly apiUrl  =   HttpHelper.apiServerDomainName + HttpHelper.apiServerPort;

  public static readonly ACK_SIGN = "_ack";

  //TODO api정보를 담는 변수임. 얘는 반드시 uri값을 가져야 함.
  //url값을 가지면 안됨. url값을 쓰고 싶으면 apiUrl이랑 합쳐서 써야 함. 그래서 public으로 해놓음.
  public static readonly api = {
    authGoogle : new ApiRequest(
      "/auth/google",   ApiRequestTypeEnum.REDIRECT
    ),
    protected : new ApiRequest(
      "/auth/protected",     ApiRequestTypeEnum.POST
    ),
    signOut: new ApiRequest(
      "/auth/signOut", ApiRequestTypeEnum.POST
    ),
  };

  public static getContentType(){
    return HttpHelper.contentType;
  }
  public static getTokenType(){
    return HttpHelper.tokenType;
  }

  public static redirectTo(uri){
    window.location.href = HttpHelper.apiUrl + uri;
  }
}
