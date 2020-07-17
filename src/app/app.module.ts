import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemorizerMainComponent } from './view/memorizer-main/memorizer-main.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MainHeaderComponent } from './view/memorizer-main/main-header/main-header.component';
import { MainSidebarComponent } from './view/memorizer-main/main-content/main-sidebar/main-sidebar.component';
import { MainNavigatorComponent } from './view/memorizer-main/main-content/main-navigator/main-navigator.component';
import { MainArticleComponent } from './view/memorizer-main/main-content/main-article/main-article.component';
import { SectionCardComponent } from './view/memorizer-main/main-content/main-navigator/section-card/section-card.component';
import { SubNavigatorComponent } from './view/memorizer-main/main-content/sub-navigator/sub-navigator.component';
import {MatRippleModule} from '@angular/material/core';
import { ProblemCardComponent } from './view/memorizer-main/main-content/main-navigator/problem-card/problem-card.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgWhiteboardModule} from 'ng-whiteboard';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MemorizerMainComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainNavigatorComponent,
    MainArticleComponent,
    SectionCardComponent,
    SubNavigatorComponent,
    ProblemCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
    MatInputModule,
    MatButtonToggleModule,
    NgWhiteboardModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
