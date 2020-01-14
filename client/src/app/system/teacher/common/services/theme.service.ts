import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Theme } from 'src/app/shared/interfaces';
import { enRoute } from 'src/app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{
  constructor(private http: HttpClient){}

  getAll(subjectId: string, courseId: string): Observable<Theme[]>{
    return this.http.get<Theme[]>(`${enRoute.Teacher}/theme/${subjectId}/${courseId}`)
  }

  getById(id: string): Observable<Theme>{
    return this.http.get<Theme>(`${enRoute.Teacher}/theme/${id}`)
  }

  create(theme: Theme): Observable<Theme>{
    return this.http.post<Theme>(`${enRoute.Teacher}/theme`, theme)
  }
}