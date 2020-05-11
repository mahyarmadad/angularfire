import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flashmessage: FlashMessagesService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.authservice.register(this.email, this.password).then(res => {
      this.flashmessage.show("You are now a New Member", { cssClass: "alert-success", timeout: 3000 });
      this.router.navigate(["/"]);
    }).catch(err => {
      this.flashmessage.show(err.message, { cssClass: "alert-danger", timeout: 3000 });
    });
  }
}
