import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(private auth: AuthService,
              private router: Router){
  }

  private setTokenInRequest(req: HttpRequest<any>): HttpRequest<any>{
    return req.clone({
        setHeaders: {                   
            Authorization: this.auth.getToken().accessToken
        }
    })
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()){
      req = this.setTokenInRequest(req)
    }
    return next.handle(req).pipe(
      catchError(
        (error:HttpErrorResponse)=> this.handleAuthError(error,req, next)
      )
    )
  }

  private handleAuthError(error: HttpErrorResponse, req: HttpRequest<any>, next:HttpHandler): Observable<any>{
    if(error.status === 426){
      console.log('error status === 426')
      this.auth.logOut()
      this.router.navigate(['/auth/login'],{
          queryParams: {
              sessionFailed: true
          }
      })
  }
  if(error.status === 401){
    console.log('error status === 401')
     return this.auth.refreshToken().pipe(
          switchMap(
              () => {
                  req = this.setTokenInRequest(req)
                  return next.handle(req)
              }
          )
      )
  }
  return throwError(error)
  }

}