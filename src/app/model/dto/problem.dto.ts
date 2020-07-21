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
    this.title = title;
    this.question = question;
    this.answer = answer;

    if (questionedCount) {
      this.questionedCount = questionedCount;
    } else {
      this.questionedCount = 0;
    }
    if (correctCount) {
      this.correctCount = correctCount;
    } else {
      this.correctCount = 0;
    }
    if (incorrectCount) {
      this.incorrectCount = incorrectCount;
    } else {
      this.incorrectCount = 0;
    }
  }
}
