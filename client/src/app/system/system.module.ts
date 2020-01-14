import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SiteLayoutComponent } from '../shared/layouts/site-layout/site-layout.component';

@NgModule({
    declarations: [ 
        SiteLayoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,  
        SystemRoutingModule,
        SharedModule      
    ]
})
export class SystemModule{}