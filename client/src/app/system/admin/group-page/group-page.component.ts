import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { GroupService } from '../common/services/group.service';
import { CourseService } from '../common/services/course.service';
import { SpecialtyService } from '../common/services/specialty.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('collapsible', {static:false}) collapsibleRef: ElementRef
  sub: Subscription
  isLoaded = false;
  viewData: any = []

  constructor(private groupService: GroupService,
              private specialtyService: SpecialtyService,
              private courseService: CourseService) { }

  ngOnInit() {
   this.sub = combineLatest(    
     this.courseService.getAll(),
     this.specialtyService.getAll(),
     this.groupService.getAll()
   ).subscribe(
     ([courses, specialties, groups])=>{
        this.viewData = courses.map(c => (
            { courseId: c._id, 
              title: c.title, 
              groupCount: 0,
              specialties: specialties.map(s=>(
                  { specialtyId: s._id, title: s.title, groups: groups.filter(g => {
                      return (g.courseId._id===c._id && g.specialtyId._id===s._id)
                    }) 
                  }
                )
              )
            }
          )
          
        )        

        this.viewData.forEach(c => {
          let groupCount = 0;
          c.specialties.forEach(s => {
            groupCount +=s.groups.length
          });
          c.groupCount = groupCount
        });
        
       this.isLoaded = true
      })
  }

  ngAfterViewInit(){
    MaterialService.initCollapsible(this.collapsibleRef)
  }

  ngOnDestroy(){
    if(this.sub)
    this.sub.unsubscribe()
  }
}
