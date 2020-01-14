import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })

    this.route.queryParams.subscribe(
      (params:Params)=>{
        if(params['registered']){
          MaterialService.toast('Тепер ви маєте змогу ввійти в систему')
        }else if(params['accesDenied']){
          MaterialService.toast('Для початку авторизуйтесь в системі')
        }else if(params['sessionFailed']){
          MaterialService.toast('Час сесії закінчився. Ввійдіть знову')
        }
      }
    )
  }

  onSubmit(){
    this.form.disable()

    const user = this.form.value;
    this.aSub = this.auth.login(user).subscribe(
      token =>{        
        this.router.navigate(['/'])
      },
      error=>{
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}
