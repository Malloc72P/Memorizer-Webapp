import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgWhiteboardService} from 'ng-whiteboard';

@Component({
  selector: 'app-main-article',
  templateUrl: './main-article.component.html',
  styleUrls: ['./main-article.component.css', '../../../dase-style/color-style.css', '../../../dase-style/toolbar-style.css']
})
export class MainArticleComponent implements OnInit {
  public currInputerMode = "whiteboard";
  public brushSize = 0.3;
  public isAnswerViewingMode = false;
  constructor(
    private whiteboardService: NgWhiteboardService
  ) { }

  ngOnInit(): void {

  }
  clear(){
    this.whiteboardService.erase();
  }
  redoWb(){
    this.whiteboardService.redo();
  }
  undoWb(){
    this.whiteboardService.undo();
  }
  saveWb(){

  }

  /*화이트보드 크기조절 부분 로직*/
  @ViewChild('wbCanvas') wbCanvas: ElementRef;
  onPointerDown(event){
    this.isDragging = true;
  }
  public wbHeight = 420;
  resizeSidebar(event){
    // console.log("MainArticleComponent >> resizeSidebar >> event : ",event);
    let wbCanvasEl:HTMLElement = this.wbCanvas.nativeElement;
    let newHeight = event.y - wbCanvasEl.offsetTop;
    if (420 < newHeight && newHeight < 800) {
      this.wbHeight = newHeight;
    }
  }
  private isDragging = false;
  @HostListener('document:pointermove', ['$event']) onmousemove(e) {
    if (!this.isDragging) {
      return;
    }
    this.resizeSidebar(e);
  }

  @HostListener('document:pointerup', ['$event']) onmouseup(e) {
    if (this.isDragging) {
      this.isDragging = false;
    }
  }
  @HostListener('document:keydown', ['$event']) onKeyDown(e){
    // console.log("MainArticleComponent >> onkeydown >> e : ",e);
    switch (e.code) {
      case "KeyZ":
        if(e.ctrlKey && !e.shiftKey){
          //undo 단축키
          this.undoWb();
          this.preventDefault(e);
        }
        else if(e.ctrlKey && e.shiftKey){
          //redo 단축키
          this.redoWb()
          this.preventDefault(e);
        }
        break;
      case "KeyR":
        if(e.ctrlKey && e.shiftKey){
          //리셋 단축키
          this.clear();
          this.preventDefault(e);
        }
    }
  }
  preventDefault(e){
    e.preventDefault();
  }

}
