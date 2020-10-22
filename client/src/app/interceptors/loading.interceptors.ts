import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../_services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private busyService: SpinnerService,
    private auth: AngularFireAuth) { }

  public isLoading = new BehaviorSubject(false);

  showLoader(): void {
    this.busyService.busy();
  }

  endLoader(): void {
    this.busyService.idle();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log();
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.endLoader();
      }
    },
      () => {
        this.endLoader();
      }));
  }

}
