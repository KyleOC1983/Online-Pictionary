import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authInfo: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authInfo = this.afAuth.authState;
  }
  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) => {  });
  }
  
  logout() {
    this.afAuth.signOut().then(() => { });
  }
}
