import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Subscription, combineLatest } from 'rxjs';

import { Subject, Course, Specialty } from 'src/app/shared/interfaces';
import { SubjectService } from '../common/services/subject.service';
import { CourseService } from '../common/services/course.service';
import { SpecialtyService } from '../common/services/specialty.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {

  subject: Subject
  sub: Subscription
  courses: Course[] = []
  specialties: Specialty[] = []
  selectedCourse = null;
  selectedSpecialty = null;
  isAll = false;

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private courseService: CourseService,
              private specialtyService: SpecialtyService) { }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      switchMap((params: Params)=>{
        if(params['id']){
          return combineLatest(
                  this.subjectService.getById(params['id']),
                  this.courseService.getAll(),
                  this.specialtyService.getAll()
                )
        }
        return of(null)  
      })
    ).subscribe(
      (data) => {
        if(data){
          this.subject = data[0];
          this.courses = data[1] ;
          this.specialties = data[2] ;
        }
      }
    )
  }

  createPlanning(){
    if(!(this.selectedCourse && (this.selectedSpecialty || this.isAll)))
    return

    //open modal 

  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
