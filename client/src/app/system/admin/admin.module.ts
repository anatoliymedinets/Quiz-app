import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { CoursePageComponent } from './course-page/course-page.component';
import { CourseFormComponent } from './course-page/course-form/course-form.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupFormComponent } from './group-page/group-form/group-form.component';
import { SpecialtyPageComponent } from './specialty-page/specialty-page.component';
import { SpecialtyFormComponent } from './specialty-page/specialty-form/specialty-form.component';
import { AdminComponent } from './admin.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
    declarations: [ 
        AdminComponent,
        CoursePageComponent,
        CourseFormComponent,
        GroupPageComponent,
        GroupFormComponent,
        SpecialtyPageComponent,
        SpecialtyFormComponent,
        SettingsPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,  
        AdminRoutingModule,
        SharedModule      
    ],
    entryComponents: [GroupFormComponent]
})
export class AdminModule{}