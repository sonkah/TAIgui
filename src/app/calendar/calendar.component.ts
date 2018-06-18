import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-calendar',
  template: `
    <ngx-sample-layout>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
