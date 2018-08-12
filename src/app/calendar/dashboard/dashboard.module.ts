import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
