import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from './calendar-page.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [CalendarPageComponent]
})
export class CalendarPageModule { }
