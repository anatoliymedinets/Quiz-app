import { Component, OnInit } from '@angular/core';
import { CourseService } from '../common/services/course.service';
import { Course } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-course',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  courses$: Observable<Course[]>

  constructor(private courseService: CourseService) { }

  ngOnInit() {
   this.courses$ = this.courseService.getAll()
  }
}
