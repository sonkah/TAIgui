import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageModule } from './calendar-page/calendar-page.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CalendarComponent } from './calendar.component';
import { ThemeModule } from '../@theme/theme.module';

const CAL = [CalendarComponent];
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CalendarRoutingModule,
    CalendarPageModule,
    DashboardModule,
  ],
  declarations: [
    ...CAL
  ]
})
export class CalendarModule { }
