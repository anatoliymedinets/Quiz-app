import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingService } from '../common/services/setting.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Setting } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  form: FormGroup
  settingId: string

  constructor(private settingService: SettingService) { }

  ngOnInit() {
    this.form = new FormGroup({
      teacherKey: new FormControl(null, Validators.required),
      studentKey: new FormControl(null, Validators.required)
    })

    this.settingService.get().subscribe((setting)=>{
      const {_id, ...data} = setting;
      this.settingId  = _id
      this.form.patchValue({
        ...data
      })
      MaterialService.updateTextInputs()
    })
  }

  onSubmit(){
    const setting: Setting = {_id: this.settingId, ...this.form.value}
    this.settingService.save(setting).subscribe(
      (setting)=> {        
        const {_id, ...data} = setting
        this.form.reset({          
          ...data
        })
        MaterialService.toast('Дані оновлено')
      },
      (err) => MaterialService.toast('Помилка')     
    )
  }

}
