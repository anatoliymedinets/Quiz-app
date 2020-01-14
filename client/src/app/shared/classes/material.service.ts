import { ElementRef } from '@angular/core';

declare var M

export interface MaterialInstance{
  open?(): void
  close?(): void
  destroy?(): void
}

export interface MaterialDatepicker extends MaterialInstance{
  date?: Date
}

export class MaterialService{
 
  static toast(message: string){
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef){
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static initializeSidenav(ref: ElementRef, options = {}): any{
    return M.Sidenav.init(ref.nativeElement, options);
  }

  static initializeModal(ref: ElementRef, options?): MaterialInstance {
    return M.Modal.init(ref.nativeElement, options)
  }

  static initDatepicker(datepickerRef: ElementRef, onClose?: ()=> void, parent?: ElementRef ): MaterialDatepicker{
    return M.Datepicker.init(datepickerRef.nativeElement,{
         format: 'dd.mm.yyyy',
         showClearBtn: true,
         onClose,
         container : parent? parent.nativeElement: null,
         i18n: {                
                 selectMonths: true,
                 today: 'Сьогодні',
                 clear: 'Очистити',
                 cancel: 'Відмінити',
                 close: 'Закрити',
                 months: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
                 monthsShort: ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Вер','Жов','Лис','Гру'],
                 weekdays: ['Неділя','Понеділок','Вівторок','Середа','Четвер','Пятниця','Субота'],
                 weekdaysShort: ['Нед','Пнд','Втр','Срд','Чтв','Птн','Сбт'],
                 weekdaysAbbrev: [ 'Н', 'П', 'В', 'С', 'Ч', 'П', 'С' ]
             }
     })
  }

  static initCollapsible(elem: ElementRef){
    M.Collapsible.init(elem.nativeElement)
  }
  
  static updateTextInputs(){
    M.updateTextFields()
  }

  static textareaAutoResize(textAreaRef: ElementRef) {
    M.textareaAutoResize(textAreaRef.nativeElement)
  }

  static initSelect(selectRef: ElementRef): MaterialInstance {
    return M.FormSelect.init(selectRef.nativeElement)
  }
}