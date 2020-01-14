import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectComponent } from './components/select/select.components';
import { RefDirective } from './directives/ref.directive';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
   declarations: [
       SelectComponent,
       RefDirective,
       LoaderComponent,
    ],
    imports: [
        CommonModule
    ],
   exports: [
       SelectComponent,
       RefDirective,
       LoaderComponent
    ]
})
export class SharedModule{}