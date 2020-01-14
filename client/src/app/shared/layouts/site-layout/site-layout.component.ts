import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../classes/material.service';
import { User } from '../../interfaces';
import { enRoles } from '../../enums';
import { SubjectService } from 'src/app/system/teacher/common/services/subject.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild("sidenav", {static: false}) sidenavRef: ElementRef
  sidenav: any = null
  user: User = null
  links = []

  sub: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private subjectService: SubjectService) { }
  
  ngOnInit(){
    this.user = this.auth.IdentityUser
    this.links = this.getLinksByRole(this.user.roleId)
  }
  ngAfterViewInit() {
    this.sidenav = MaterialService.initializeSidenav(this.sidenavRef, {draggable:false})
  }

  getRoleName(roleId: Number): string{
    switch(roleId){
      case enRoles.Admin: 
        return 'Адміністратор';
      case enRoles.Teacher:
        return 'Викладач'
      case enRoles.Student:
        return 'Студент'
    }
  }

  getLinksByRole(roleId: Number){
    switch(roleId){
      case enRoles.Admin: 
        return [
          {title: 'Спеціальності', url: '/admin/specialty'},
          {title: 'Курси', url: '/admin/course'},
          {title: 'Групи', url: '/admin/group'},
          {title: 'Налаштування', url: '/admin/settings'},
        ];
      case enRoles.Teacher:
        this.getSubSubjects();
        return [
          {title: 'Створити предмет', url: '/teacher/subject/new',},
          {title: 'Планування', url: '/teacher/planning'},
        ];
      case enRoles.Student:
        return [];
    }
  }

   getSubSubjects(){
    this.sub = this.subjectService.getAll().subscribe(
      data =>{
        const subjectsLinks: any[] = data.map(s =>{
          return {title: s.title, url: `/teacher/subject/${s._id}`}
        });
        this.links.splice(0,0,...subjectsLinks)
      }
    )
  }

  logout(event: Event){
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/auth/login'])
  }

}
