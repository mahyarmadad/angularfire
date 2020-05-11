import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  seeting: Settings;

  constructor(
    private router: Router,
    private flashmessage: FlashMessagesService,
    private seetings: SettingsService,
  ) { }

  ngOnInit(): void {
    this.seeting = this.seetings.getSettings();
  }
  onSubmit() {
    this.seetings.changeSettings(this.seeting);
    this.flashmessage.show("Settings Changed and Saved !", { cssClass: "alert-success", timeout: 4000 });
  }
}
