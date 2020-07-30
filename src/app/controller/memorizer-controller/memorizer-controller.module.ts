import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControllerModule} from '../controller.module';
import {ProblemRequesterService} from './problem-requester/problem-requester.service';
import {SectionRequesterService} from './section-requester/section-requester.service';
import {DiscordRequesterService} from './discord-requester/discord-requester.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ControllerModule
  ],
  providers : [
    ProblemRequesterService,
    SectionRequesterService,
    DiscordRequesterService
  ],
})
export class MemorizerControllerModule { }
