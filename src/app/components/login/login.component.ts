import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flashmessage: FlashMessagesService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authservice.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(["/"]);
      }
    })
  }
  onSubmit() {
    this.authservice.login(this.email, this.password).then(res => {
      this.flashmessage.show("You are now logged in", { cssClass: "alert-success", timeout: 3000 });
      this.router.navigate(["/"]);
    }).catch(err => {
      this.flashmessage.show(err.message, { cssClass: "alert-danger", timeout: 3000 });
    });
  }
}
