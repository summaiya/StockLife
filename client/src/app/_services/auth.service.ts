import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { IUser } from '../_model/IUser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.uid));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  signin(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  signup(value) {
    return this.afAuth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(
        (res) => {
          this.addUser(value.name, res.user.uid).then(() => {
            return res;
          });
        },
        (err) => console.error(err)
      );
  }

  private addUser(name: string, uid: string) {
    return this.afs.collection('users').doc(uid).set({
      name,
      total: 0,
      stock: [],
    });
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  getUser() {
    return this.afs.collection("users").doc(localStorage.getItem("user").substring(1,localStorage.getItem("user").length-1)).get();
  }

  editUser(data) {
    return this.afs.collection("users")
      .doc(localStorage.getItem("user").substring(1,localStorage.getItem("user").length-1))
      .set(data).then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log(err);
      });
  }
}
