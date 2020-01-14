import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Message } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';


@Injectable({providedIn: 'root'})
export class CourseService{

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Course[]>{
    return this.http.get<Course[]>(`${enRoute.Admin}/course`)
  }

  getById(id: string): Observable<Course>{
    return this.http.get<Course>(`${enRoute.Admin}/course/${id}`)
  }

  create(course: Course): Observable<Course>{
    return this.http.post<Course>(`${enRoute.Admin}/course`,course)
  }

  update(course: Course): Observable<Course>{
    return this.http.put<Course>(`${enRoute.Admin}/course`,course)
  }

  remove(id: string): Observable<Message>{
    return this.http.delete<Message>(`${enRoute.Admin}/course/${id}`)
  }
}