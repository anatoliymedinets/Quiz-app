import { Component, Input, forwardRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaterialService, MaterialInstance} from '../../classes/material.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('select', {static: true}) selectRef: ElementRef

  @Input('id') controlId: string
  @Input('label') label: string
  @Input('default') default: string
  @Input('items') items: {_id: string, title: string}[]

  value: any
  selectInstance: MaterialInstance

  ngAfterViewInit() {
    this.selectInstance = MaterialService.initSelect(this.selectRef)
    MaterialService.updateTextInputs()
  } 
  private onChange = (value: any) => {}
  private onTouched = (value: any) => {}

  writeValue(value: any): void {
    if(!value){
      this.items.unshift({_id:'', title:this.default})
    }
    this.value = value || null
    this.changeValue(this.value)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  changeValue(value: any){
    this.value = value
     this.onTouched(this.value)
     this.onChange(this.value)
  }
}