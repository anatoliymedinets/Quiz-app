import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../interfaces';

@Injectable({providedIn: 'root'})
export class AuthService{

  private token: authToken = null
  IdentityUser: User = null

  constructor(private http: HttpClient){
  }

  register(user: User) : Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<authToken>{
    return this.http.post<authToken>('/api/auth/login',user)
    .pipe(
      tap(
        (token:authToken)=>{
          localStorage.setItem('auth-token', token.accessToken)
          localStorage.setItem('refresh-token', token.refreshToken)

          this.setToken(token)
        }
      )
    )
  }

  setToken(token: authToken){
    if(token){
      const helper = new JwtHelperService(); 
      const {email, userId, roleId, fullName} = helper.decodeToken(token.accessToken.slice(5));
      this.IdentityUser = {email, _id: userId, roleId, fullName}
    }
    this.token = token
  }

  getToken(): authToken{
    return this.token
  }

  isAuthenticated(){
    return !!this.token
  }

  logOut(){
    this.setToken(null)
    this.IdentityUser = null
    localStorage.clear()
  }

  refreshToken(): Observable<authToken>{
    return this.http.post<authToken>('/api/auth/refreshToken', this.token)
    .pipe(
        tap(
            (token: authToken)=>{
                localStorage.setItem('auth-token', token.accessToken)
                localStorage.setItem('refresh-token', token.refreshToken)
                
                this.setToken(token)   
            }
        )
    )
 }

}

interface authToken{
  accessToken: string,
  refreshToken: string
}