import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  
  constructor(private auth: AuthService){
  }

  ngOnInit() {
    const potentialAccesToken = localStorage.getItem('auth-token')
    const potentialRefreshToken = localStorage.getItem('refresh-token')

    if(potentialAccesToken !== null && potentialRefreshToken !== null){
      this.auth.setToken({ accessToken: potentialAccesToken, refreshToken: potentialRefreshToken})
    }
  }
  
}
