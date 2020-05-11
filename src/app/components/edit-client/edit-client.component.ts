import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from "../../models/Clients";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = { firstName: "", lastName: "", email: "", phone: "", balance: 0 }
  disableBalanceOnEdit: boolean;

  hasBalance: boolean = false;
  showBalance: boolean = false;

  constructor(private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashmessage: FlashMessagesService,
    private settings: SettingsService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.clientservice.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settings.getSettings().disableBalanceOnEdit;
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashmessage.show("Please fill gthe form correctly", { cssClass: "alert-danger", timeout: 4000 });
    } else {
      // Add ID
      value.id = this.id;
      this.clientservice.updateClient(value);
      this.flashmessage.show("Client Updated", { cssClass: "alert-success", timeout: 4000 });
      this.router.navigate(["/client/" + this.id]);
    }
  }
}
