import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../_services/spinner.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize, mergeMap, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService,
    private auth: AngularFireAuth) {}
    public isLoading = new BehaviorSubject(false);
    private requests: HttpRequest<any>[] = [];
    showLoader(){
      this.busyService.busy();
    }
    endLoader(){
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
        (err: any) => {
          this.endLoader();
      }));
    }

  }