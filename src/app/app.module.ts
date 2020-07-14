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

@NgModule({
  declarations: [
    AppComponent,
    MemorizerMainComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainNavigatorComponent,
    MainArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
