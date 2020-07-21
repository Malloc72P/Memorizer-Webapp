export class UserDto {
  public idToken;
  public userName;
  public authToken;

  constructor(idToken?, userName?, authToken?) {
    this.idToken = idToken;
    this.userName = userName;
    this.authToken = authToken;
  }
}
