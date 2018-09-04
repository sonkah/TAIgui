import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap  } from 'rxjs/operators';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { UserInfo } from './userinfo';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService implements CanActivate {
  httpOK = 200;
  private apiUrl = "/api";
  private userInfoUrl = this.apiUrl + "/user";

  constructor(private http: HttpClient, private router: Router) {}

  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.userInfoUrl).pipe(
        map(res => {
            return { firstName: res.userAuthentication.details.first_name,
                     lastName:  res.userAuthentication.details.last_name };
        }),
        catchError(this.handleError('getUserInfo'))
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getUserInfo().pipe(
      map(userInfo => {
        if (userInfo != null){
          return true;
        }
        else {
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }

  private handleError (operation = 'operation') {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.messageService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(null);
    };
  }
}
