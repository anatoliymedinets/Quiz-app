import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators'

import { SpecialtyService } from '../../common/services/specialty.service';
import { Specialty } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-specialty-form',
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.scss']
})
export class SpecialtyFormComponent implements OnInit, OnDestroy {
  
  private ngUnsubscribe = new Subject()
  isNew: boolean = true
  hasError: boolean = false
  form: FormGroup  
  specialtyId: string
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private specialtyService: SpecialtyService) { }

  ngOnInit() {

      this.form = new FormGroup({
        title: new FormControl(null, [Validators.required]),
      })  
      this.form.disable()

      this.route.params.pipe(
          takeUntil(this.ngUnsubscribe),
          switchMap((params: Params)=>{
            if(params['id']){
              this.isNew = false
              return this.specialtyService.getById(params['id'])
            }
            return of(null)  
          })
      ).subscribe(
        (data: Specialty) => {
          if(data){
            this.specialtyId = data._id
            this.form.patchValue({
              title: data.title
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (err)=>{this.hasError = true}  
      )

  }

  onSubmit(){
    if(this.specialtyId){
      this.specialtyService.update({_id: this.specialtyId, ...this.form.value })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/admin/specialty']))
    }else{
      this.specialtyService.create({...this.form.value})
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/admin/specialty']))
    }
  }

  delete(){
    const decision = window.confirm(`Ви дійсно бажаєте видалити дану спціальність?`)
    if (decision) {
      this.specialtyService.remove(this.specialtyId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          response=>{
            MaterialService.toast(response.message)
            this.router.navigate(['/admin/specialty'])
          },
          error => MaterialService.toast(error.error.message)
        )
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
