import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SharedModule } from 'src/app/shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

@NgModule({
    declarations: [ 
        StudentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,  
        StudentRoutingModule,
        SharedModule      
    ]
})
export class StudentModule{}