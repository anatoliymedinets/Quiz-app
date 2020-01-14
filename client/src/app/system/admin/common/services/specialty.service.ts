import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Specialty } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';

@Injectable({providedIn: 'root'})
export class SpecialtyService{
  constructor(private http: HttpClient){
  }

  getAll(): Observable<Specialty[]>{
    return this.http.get<Specialty[]>(`${enRoute.Admin}/specialty`)
  }

  getById(id: string): Observable<Specialty>{
    return this.http.get<Specialty>(`${enRoute.Admin}/specialty/${id}`)
  }

  create(specialty: Specialty): Observable<Specialty>{
    return this.http.post<Specialty>(`${enRoute.Admin}/specialty`,specialty)
  }

  update(specialty: Specialty): Observable<Specialty>{
    return this.http.put<Specialty>(`${enRoute.Admin}/specialty`, specialty)
  }

  remove(id: string): Observable<Message>{
    return this.http.delete<Message>(`${enRoute.Admin}/specialty/${id}`)
  }
}