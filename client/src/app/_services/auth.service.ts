import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../_model/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.uid));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  private loggedIn = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem('isLoggedIn'))
  );

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  user$: Observable<IUser>;
  user: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('userData'))
  );

  async signin(email: string, password: string): Promise<void> {
    try {
      await this.angularFireAuth
        .signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
        this.loggedIn.next(true);
        localStorage.setItem('isLoggedIn', 'true');
      });
    } catch (error) {
      window.alert(error.message);
    }
  }

  signup(value: { email: string; password: string; name: string; }): Promise<void> {
    return this.angularFireAuth
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

  async signOut(): Promise<void> {
    await this.angularFireAuth.signOut();
    localStorage.clear();
    this.router.navigate(['login']);
    this.loggedIn.next(false);
  }

  private addUser(name: string, uid: string): Promise<void> {
    return this.angularFireStore.collection('users').doc(uid).set({
      name,
      total: 0,
      stock: [],
    });
  }

  getUser(): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    const userObservable = this.angularFireStore
      .collection('users')
      .doc(
        localStorage
          .getItem('user')
          .substring(1, localStorage.getItem('user').length - 1)
      )
      .get();
    userObservable.subscribe((res) => {
      this.user.next(res.data());
    });
    return userObservable;
  }

  async editUser(data): Promise<void> {
    try {
      const res = await this.angularFireStore
        .collection('users')
        .doc(
          localStorage
            .getItem('user')
            .substring(1, localStorage.getItem('user').length - 1)
        )
        .set(data);
      console.log('res', res);
    } catch (err) {
      console.log(err);
    }
  }
}
