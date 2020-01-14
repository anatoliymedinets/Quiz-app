import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from 'src/app/shared/interfaces';
import { SpecialtyService } from '../common/services/specialty.service';

@Component({
  selector: 'app-specialty-page',
  templateUrl: './specialty-page.component.html',
  styleUrls: ['./specialty-page.component.scss']
})
export class SpecialtyPageComponent implements OnInit {

  specialties$: Observable<Specialty[]>

  constructor(private specialtyService: SpecialtyService) { }

  ngOnInit() {
   this.specialties$ = this.specialtyService.getAll()
  }

}
