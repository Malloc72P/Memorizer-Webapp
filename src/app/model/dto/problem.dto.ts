export class ProblemDto {
  public _id;
  public owner;
  public createdDate;
  public questionedCount;
  public correctCount;
  public incorrectCount;
  public title;
  public question;
  public answer;

  constructor(id?, owner?, createdDate?, questionedCount?, correctCount?, incorrectCount?, title?, question?, answer?) {
    this._id = id;
    this.owner = owner;
    this.createdDate = createdDate;
    this.questionedCount = questionedCount;
    this.correctCount = correctCount;
    this.incorrectCount = incorrectCount;
    this.title = title;
    this.question = question;
    this.answer = answer;
  }
}
