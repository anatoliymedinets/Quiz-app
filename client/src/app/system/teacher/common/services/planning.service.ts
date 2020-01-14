import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planning, Message } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';


@Injectable({providedIn: 'root'})
export class PlanningService{

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Planning[]>{
    return this.http.get<Planning[]>(`${enRoute.Teacher}/planning`)
  }

  getById(id: string): Observable<Planning>{
    return this.http.get<Planning>(`${enRoute.Teacher}/planning/${id}`)
  }

  create(planing: Planning): Observable<Planning>{
    return this.http.post<Planning>(`${enRoute.Teacher}/planning`,planing)
  }

  update(planing: Planning): Observable<Planning>{
    return this.http.put<Planning>(`${enRoute.Teacher}/planning`,planing)
  }

  remove(id: string): Observable<Message>{
    return this.http.delete<Message>(`${enRoute.Teacher}/planning/${id}`)
  }
}