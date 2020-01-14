import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { Subject as Subj }  from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { SubjectService } from '../../common/services/subject.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject()
  isNew: boolean = true
  hasError: boolean = false
  isLoaded = false
  form: FormGroup  
  subject: Subj

  constructor(private router: Router,
              private route: ActivatedRoute,
              private subjectService: SubjectService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    })
    this.form.disable()

      this.route.params.pipe(
          takeUntil(this.ngUnsubscribe),
          switchMap((params: Params)=>{
            if(params['id']){
              this.isNew = false
              return this.subjectService.getById(params['id'])
            }
            return of(null)  
          })
      ).subscribe(
        (data: Subj) => {
          if(data){
            this.subject = data
            this.form.patchValue({
              ...data
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
          this.isLoaded = true
        },
        (err)=>{this.hasError = true}  
      )
  }

  onSubmit(){
    if(this.subject){
      this.subjectService.update({_id: this.subject._id, ...this.form.value })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=> this.router.navigate(['/teacher/subject', this.subject._id]))
    }else{
      this.subjectService.create({...this.form.value})
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/teacher/subject']))
    }
  }

  delete(){
    const decision = window.confirm(`Ви дійсно бажаєте видалити даний предмет?`)
    if (decision) {
      this.subjectService.remove(this.subject._id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          response=>{
            MaterialService.toast(response.message)
            this.router.navigate(['/teacher/subject'])
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
