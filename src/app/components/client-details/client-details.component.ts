import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from "../../models/Clients";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalance: boolean = false;

  constructor(
    private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashmessage: FlashMessagesService,
  ) { }

  ngOnInit(): void {
    // Get id from URL 
    this.id = this.route.snapshot.params["id"];
    this.clientservice.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }
  updateBalance() {
    this.clientservice.updateClient(this.client);
    this.flashmessage.show("Balance updated", { cssClass: "alert-success", timeout: 4000 });
  }

  onDeleteClick() {
    if (confirm("Are you sure?")) {
      this.clientservice.deleteClient(this.client);
      this.flashmessage.show("Client Deleted", { cssClass: "alert-warning", timeout: 4000 });
      this.router.navigate(['/']);
    }
  }
}
