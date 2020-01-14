import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/classes/auth.guard';
import { AdminComponent } from './admin.component';
import { SpecialtyPageComponent } from './specialty-page/specialty-page.component';
import { SpecialtyFormComponent } from './specialty-page/specialty-form/specialty-form.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseFormComponent } from './course-page/course-form/course-form.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupFormComponent } from './group-page/group-form/group-form.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';


const routes: Routes = [
    {path:'', component: AdminComponent, canActivate: [AuthGuard], children:[        
        {path: 'specialty', component:SpecialtyPageComponent,},
        {path: 'specialty/new', component:SpecialtyFormComponent},
        {path: 'specialty/:id', component:SpecialtyFormComponent},

        {path: 'course', component: CoursePageComponent},
        {path: 'course/new', component:CourseFormComponent},
        {path: 'course/:id', component:CourseFormComponent},  

        {path: 'group', component:GroupPageComponent},
        {path: 'group/new', component:GroupFormComponent},
        {path: 'group/:id', component:GroupFormComponent},  
            
        {path: 'settings', component: SettingsPageComponent}
    ]},   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
