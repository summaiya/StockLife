// import { SpinnerService } from './spinner.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../_model/IUser';
// import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // constructor

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    // private spinner: SpinnerService //  will use to trigger observeble in spinner service
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.uid));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // custom block started -->

  //   I have used this block to enable/ disable check in navbar bar

  // boolean for login
  private loggedIn = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem('isLoggedIn'))
  );
  // changes by me
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  user$: Observable<IUser>;
  user: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('userData'))
  );

  //  animation start stop may be I will need it to add more logic in future
  startAnimation() {
    // this.spinner.requestStarted();
  }
  endAnimation() {
    // this.spinner.requestEnded();
  }
  resetAnimation() {
    // this.spinner.resetSpinner();
  }
  //  animation block ended

  // custom block ended  -->

  //   sign in sign up block ---->

  signin(email, password) {
    // this.startAnimation();
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
          // this.endAnimation();
          this.loggedIn.next(true);
          localStorage.setItem('isLoggedIn', 'true');
        });
      })
      .catch((error) => {
        // this.spinner.resetSpinner();
        window.alert(error.message);
      });
  }
  signup(value) {
    // this.startAnimation();
    return this.afAuth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(
        (res) => {
          // this.endAnimation();
          this.addUser(value.name, res.user.uid).then(() => {
            return res;
          });
        },
        (err) => console.error(err)
      );
  }

  async signOut() {
    await this.afAuth.signOut();
    // this.startAnimation();
    localStorage.clear();
    this.router.navigate(['login']);
    // this.endAnimation();
    this.loggedIn.next(false);
  }

  //  //   sign in sign up block  ended---->

  //    user block <<  ----for add , edit , delete , and get user -->>>>>

  private addUser(name: string, uid: string) {
    return this.afs.collection('users').doc(uid).set({
      name,
      total: 0,
      stock: [],
    });
  }

  getUser() {
    const userObservable = this.afs
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

  editUser(data) {
    return this.afs
      .collection('users')
      .doc(
        localStorage
          .getItem('user')
          .substring(1, localStorage.getItem('user').length - 1)
      )
      .set(data)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  << end user block --->>

  // code for interceptor
  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return next.handle(request);
  // }
}
