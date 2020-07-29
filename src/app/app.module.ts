import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {DocumentModule} from './document/document.module';
import {MemorizerMainModule} from './view/memorizer-main/memorizer-main.module';
import {MemorizerAccountMgrModule} from './view/memorizer-account-mgr/memorizer-account-mgr.module';
import {ModelModule} from './model/model.module';
import {RouterModule} from '@angular/router';
import {MemorizerControllerModule} from './controller/memorizer-controller/memorizer-controller.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [

  ],
  imports: [
    /* *************************************************** */
    /* Angular START */
    /* *************************************************** */
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    /* **************************************************** */
    /* Angular END */
    /* **************************************************** */

    /* *************************************************** */
    /* Memorizer Import START */
    /* *************************************************** */
    MemorizerMainModule,
    MemorizerAccountMgrModule,
    DocumentModule,
    ModelModule,
    MemorizerControllerModule
    /* **************************************************** */
    /* Memorizer Import END */
    /* **************************************************** */

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
