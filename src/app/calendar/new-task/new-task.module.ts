import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NewTaskComponent } from './new-task.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgDatepickerModule
  ],
  declarations: [NewTaskComponent]
})
export class NewTaskModule { }
