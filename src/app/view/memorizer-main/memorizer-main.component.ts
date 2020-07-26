import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memorizer-main',
  templateUrl: './memorizer-main.component.html',
  styleUrls: ['./memorizer-main.component.css',
              '../dase-style/color-style.scss']
})
export class MemorizerMainComponent implements OnInit {

  constructor() {
    console.log("MemorizerMainComponent >> constructor >> new Date() : ",new Date());
  }

  ngOnInit(): void {
  }

}
