import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
//import {DpDatePickerModule} from 'ng2-date-picker';
import { NewTaskComponent } from './new-task.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgDatepickerModule
//    DpDatePickerModule
  ],
  declarations: [NewTaskComponent]
})
export class NewTaskModule { }
