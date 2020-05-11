import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedinUser: string;
  showRegister: boolean;

  constructor(
    private authserver: AuthService,
    private flashmessage: FlashMessagesService,
    private router: Router,
    private settings: SettingsService
  ) { }

  ngOnInit(): void {
    this.authserver.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedinUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settings.getSettings().allowRegister;
  }
  onLogoutClick() {
    this.authserver.logout();
    this.flashmessage.show("You Logged out ", { cssClass: "alert-success", timeout: 3000 });
    this.router.navigate(["/login"]);
  }
}
