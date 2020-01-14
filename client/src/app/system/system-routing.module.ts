import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/shared/classes/auth.guard";

import { SiteLayoutComponent } from '../shared/layouts/site-layout/site-layout.component';

const routes =[
    {path:'', component: SiteLayoutComponent, canActivate: [AuthGuard], children:[
        {path:'admin', data:{ nopreload: true }, loadChildren: './admin/admin.module#AdminModule'},
        {path:'teacher', data:{ nopreload: true }, loadChildren: './teacher/teacher.module#TeacherModule'},
        {path:'student', data:{ nopreload: true }, loadChildren: './student/student.module#StudentModule'}
    ]},       
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SystemRoutingModule{}