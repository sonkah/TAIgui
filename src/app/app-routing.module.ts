import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component' ;
import { UserInfoService } from './service/user-info.service'
import { LogoutComponent } from './logout/logout.component'

const routes: Routes = [
  { path: 'calendar', loadChildren: 'app/calendar/calendar.module#CalendarModule', canActivate: [UserInfoService] },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: true,
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
