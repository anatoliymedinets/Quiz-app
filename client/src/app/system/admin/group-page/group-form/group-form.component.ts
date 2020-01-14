import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, combineLatest, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { GroupService } from '../../common/services/group.service';
import { CourseService } from '../../common/services/course.service';
import { SpecialtyService } from '../../common/services/specialty.service';
import { Group, Course, Specialty } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit, OnDestroy {

  @ViewChild("select", {static: true}) selectRef: ElementRef;

  private ngUnsubscribe = new Subject()
  isNew: boolean = true
  hasError: boolean = false
  form: FormGroup  
  group: Group
  courses: Course[] = null
  specialties: Specialty[] = null
  isLoaded = false
  
  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private groupService: GroupService,
              private coureseService: CourseService,
              private specialtyService: SpecialtyService) { }
              
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      courseId: new FormControl(null, [Validators.required]),
      specialtyId: new FormControl(null, [Validators.required])
    })  
    this.form.disable()

    combineLatest(
      this.coureseService.getAll(),
      this.specialtyService.getAll(),
      this.route.params
    )
    .pipe(
        takeUntil(this.ngUnsubscribe), 
        switchMap(([courses, specialties, params])=>{ 

          this.courses = courses
          this.specialties = specialties

          if(params['id']){
            this.isNew = false
            return this.groupService.getById(params['id'])
          }
          return of(null)  
        })
      ) 
    .subscribe(
      (data: Group) => {
        if(data){
          this.group = data
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
    if(this.group){
      this.groupService.update({_id: this.group._id, ...this.form.value })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/admin/group']))
    }else{
      this.groupService.create({...this.form.value})
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data=>this.router.navigate(['/admin/group']))
    }
  }

  delete(){
    const decision = window.confirm(`Ви дійсно бажаєте видалити дану групу?`)
    if (decision) {
      this.groupService.remove(this.group._id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          response=>{
            MaterialService.toast(response.message)
            this.router.navigate(['/admin/group'])
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
