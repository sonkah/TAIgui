import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from './edit-task.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgDatepickerModule
  ],
  declarations: [EditTaskComponent]
})
export class EditTaskModule { }
