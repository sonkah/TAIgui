import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  logoutUrl = '/api/logout';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.post(this.logoutUrl, {}).finally(() => {
          this.router.navigate(['/home']);
      }).subscribe();
   }

}
