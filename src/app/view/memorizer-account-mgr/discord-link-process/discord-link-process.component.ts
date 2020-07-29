import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-discord-link-process',
  templateUrl: './discord-link-process.component.html',
  styleUrls: ['./discord-link-process.component.css']
})
export class DiscordLinkProcessComponent implements OnInit {

  constructor(
    public route: ActivatedRoute
  ) {
    let discordDataOID = this.route.snapshot.paramMap.get('discordDataOID');
    console.log("DiscordLinkProcessComponent >> constructor >> discordDataOID : ",discordDataOID);
  }

  ngOnInit(): void {
  }

}
