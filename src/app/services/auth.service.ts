import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { rejects } from 'assert';
import { auth } from 'firebase';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }
  login(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => rejects(err))
    });
  }
  register(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => rejects(err))
    });
  }
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
