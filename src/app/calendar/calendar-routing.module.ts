import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { CalendarComponent } from './calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTaskComponent } from './new-task/new-task.component'

const routes: Routes = [
  {
    path:'',
    component: CalendarComponent,
    children: [
      {
        path: 'calendar-page',
        component: CalendarPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'new-task',
        component: NewTaskComponent,
      }
    ],
  },
  { path: '', redirectTo: 'dashboard'},
  { path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
