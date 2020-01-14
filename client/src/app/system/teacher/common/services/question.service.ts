import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class QuestionService {
  constructor(private http: HttpClient){
  }

  create(title: string, image? : File): Observable<any>{
    const fd = new FormData()
    if(image){
      fd.append('image', image, image.name)
    }
    fd.append('title', title)

    return this.http.post<any>('api/question', {})
  }

  update(id: string, title: string, image? : File): Observable<any>{
    const fd = new FormData()
    if(image){
      fd.append('image', image, image.name)
    }
    fd.append('title', title)

    return this.http.patch<any>(`api/question/${id}`, {})
  }
}