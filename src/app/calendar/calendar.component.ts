import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './menu';

@Component({
  selector: 'ngx-calendar',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class CalendarComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() { }
  ngOnInit() { }

}
