import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemorizerMainComponent} from './memorizer-main.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainSidebarComponent} from './main-content/main-sidebar/main-sidebar.component';
import {MainNavigatorComponent} from './main-content/main-navigator/main-navigator.component';
import {MainArticleComponent} from './main-content/main-article/main-article.component';
import {SectionCardComponent} from './main-content/main-navigator/section-card/section-card.component';
import {SubNavigatorComponent} from './main-content/sub-navigator/sub-navigator.component';
import {ProblemCardComponent} from './main-content/sub-navigator/problem-card/problem-card.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {DocumentModule} from '../../document/document.module';
import {ControllerModule} from '../../Controller/controller.module';
import {MemorizerDialogModule} from '../memorizer-dialog/memorizer-dialog.module';
import {NgWhiteboardModule} from 'ng-whiteboard';



@NgModule({
  imports: [
    MemorizerDialogModule,
    CommonModule,
    DocumentModule,
    ControllerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatRippleModule,
    NgWhiteboardModule,
  ],
  declarations : [
    MemorizerMainComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainNavigatorComponent,
    MainArticleComponent,
    SectionCardComponent,
    SubNavigatorComponent,
    ProblemCardComponent,
  ],
  providers : [

  ],
})
export class MemorizerMainModule { }
