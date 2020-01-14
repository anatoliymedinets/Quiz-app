import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject, Message } from 'src/app/shared/interfaces';
import { enRoute } from 'src/app/shared/enums';


@Injectable({providedIn: 'root'})
export class SubjectService{

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Subject[]>{
    return this.http.get<Subject[]>(`${enRoute.Teacher}/subject`)
  }

  getById(id: string): Observable<Subject>{
    return this.http.get<Subject>(`${enRoute.Teacher}/subject/${id}`)
  }

  create(subject: Subject): Observable<Subject>{
    return this.http.post<Subject>(`${enRoute.Teacher}/subject`,subject)
  }

  update(subject: Subject): Observable<Subject>{
    return this.http.put<Subject>(`${enRoute.Teacher}/subject`,subject)
  }

  remove(id: string): Observable<Message>{
    return this.http.delete<Message>(`${enRoute.Teacher}/subject/${id}`)
  }
}