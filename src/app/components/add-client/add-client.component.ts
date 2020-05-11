import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from "../../models/Clients";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }
  disableBalanceOnAdd: boolean;
  @ViewChild("clientForm") form: any;

  constructor(
    private flashmessage: FlashMessagesService,
    private clientservice: ClientService,
    private router: Router,
    private settings: SettingsService,
  ) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;

  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashmessage.show("Please fill the form correctly", { cssClass: 'alert-danger', timeout: 3000 });
    } else {
      // ADD CLIENT
      this.clientservice.newClient(value);
      // show success msg
      this.flashmessage.show("New Client Added succeesfully", { cssClass: 'alert-success', timeout: 3000 });
      // Redirect to Dashboard
      this.router.navigate(['/']);
    }

  }
}
