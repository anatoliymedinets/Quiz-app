import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../common/services/course.service';
import { Course } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Subject, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  @ViewChild('textarea',{static: true}) textAreaRef : ElementRef;

  private ngUnsubscribe = new Subject()
  isNew: boolean = true
  hasError: boolean = false
  form: FormGroup  
  courseId: string

  constructor(private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService) { }

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
              return this.courseService.getById(params['id'])
            }
            return of(null)  
          })
      ).subscribe(
        (data: Course) => {
          if(data){
            const { _id, ...dataField } = data
            this.courseId = _id
            this.form.patchValue({
              ...dataField
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (err)=>{this.hasError = true}  
      )
  }

  onSubmit(){
    if(this.courseId){
      this.courseService.update({_id: this.courseId, ...this.form.value })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/admin/course']))
    }else{
      this.courseService.create({...this.form.value})
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/admin/course']))
    }
  }

  delete(){
    const decision = window.confirm(`Ви дійсно бажаєте видалити даний курс?`)
    if (decision) {
      this.courseService.remove(this.courseId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          response=>{
            MaterialService.toast(response.message)
            this.router.navigate(['/admin/course'])
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
