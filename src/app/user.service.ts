import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  user$: any;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
