import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';


@Injectable({providedIn: 'root'})
export class CourseService{

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Course[]>{
    return this.http.get<Course[]>(`${enRoute.Teacher}/course`)
  }

  getById(id: string): Observable<Course>{
    return this.http.get<Course>(`${enRoute.Teacher}/course/${id}`)
  }
}