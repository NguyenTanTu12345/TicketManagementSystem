import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserToken } from '../models/user-token.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getJWT();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this.toast.error({ detail: "Faild", summary: "Expired", duration: 5000 });
            //this.router.navigate(['login']);
            return this.handleTokenExpired(request, next);
          }
        }
        return throwError(() => new Error("Something Error Occured"));
      })
    );
  }

  handleTokenExpired(req: HttpRequest<any>, next: HttpHandler) {
    let userToken = new UserToken(this.authService.getJWT()!, this.authService.getRefreshToken()!);
    return this.authService.refreshToken(userToken).pipe(
      switchMap((data: UserToken) => {
        console.log(data);
        this.authService.storeJWT(data.accessToken, data.refreshToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        })
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          this.toast.error({ detail: "Faild", summary: "Expired", duration: 5000 });
          this.router.navigate(['login']);
        })
      })
    )
  }
}
