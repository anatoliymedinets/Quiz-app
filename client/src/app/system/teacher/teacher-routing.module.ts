import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/classes/auth.guard';
import { TeacherComponent } from './teacher.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { SubjectFormComponent } from './subject-page/subject-form/subject-form.component';
import { PlanningComponent } from './planning/planning.component';

const routes: Routes = [
    {path:'', component: TeacherComponent, canActivate: [AuthGuard], children:[  
      { path:'planning', component: SubjectPageComponent},
      { path:'subject/new', component: SubjectFormComponent},
      { path:'subject/:id/edit', component: SubjectFormComponent},
      { path:'subject/:id/planning', component: PlanningComponent}
    ]},   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
