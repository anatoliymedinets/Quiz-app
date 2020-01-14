import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setting } from '../../../../shared/interfaces';
import { enRoute } from 'src/app/shared/enums';

@Injectable({providedIn: 'root'})
export class SettingService{
  constructor(private http: HttpClient){ }

  get(): Observable<Setting>{
    return this.http.get<Setting>(`${enRoute.Admin}/setting`)
  }

  save(setting: Setting): Observable<Setting>{
    return this.http.put<Setting>(`${enRoute.Admin}/setting`,setting)
  }

}