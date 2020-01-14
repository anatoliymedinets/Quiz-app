import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group, Message } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';


@Injectable({providedIn: 'root'})
export class GroupService{
  constructor(private http: HttpClient){
  }

  getAll(): Observable<Group[]>{
    return this.http.get<Group[]>(`${enRoute.Admin}/group`)
  }

  getById(id: string): Observable<Group>{
    return this.http.get<Group>(`${enRoute.Admin}/group/${id}`)
  }

  create(group: Group): Observable<Group>{
    return this.http.post<Group>(`${enRoute.Admin}/group`,group)
  }

  update(group: Group): Observable<Group>{
    return this.http.put<Group>(`${enRoute.Admin}/group`,group)
  }

  remove(id: string): Observable<Message>{
    return this.http.delete<Message>(`${enRoute.Admin}/group/${id}`)
  }
}