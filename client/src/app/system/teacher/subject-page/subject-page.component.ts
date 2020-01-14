import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {Subject} from 'src/app/shared/interfaces'
import { SubjectService } from '../common/services/subject.service';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss']
})
export class SubjectPageComponent implements OnInit {

  isRoot: boolean
  subjects$: Observable<Subject[]>

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjects$ =this.subjectService.getAll()
  }
}
