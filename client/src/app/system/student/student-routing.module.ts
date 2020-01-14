import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/classes/auth.guard';
import { StudentComponent } from './student.component';



const routes: Routes = [
    {path:'', component: StudentComponent, canActivate: [AuthGuard], children:[        
    ]},   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
