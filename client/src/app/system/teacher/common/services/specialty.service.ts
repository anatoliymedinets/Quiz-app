import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Specialty } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';

@Injectable({providedIn: 'root'})
export class SpecialtyService{

  constructor(private http: HttpClient){
  }

  getAll(): Observable<Specialty[]>{
    return this.http.get<Specialty[]>(`${enRoute.Teacher}/specialty`)
  }

  getById(id: string): Observable<Specialty>{
    return this.http.get<Specialty>(`${enRoute.Teacher}/specialty/${id}`)
  }
}