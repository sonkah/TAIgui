import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap  } from 'rxjs/operators';

//import { TaskStatus } from './taskstatus';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { UserInfo } from './userinfo';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "/api";
  private taskUrl = this.apiUrl + "/task"

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl).pipe(
      catchError(this.handleError('getTasks'))
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.taskUrl + `/${id}`).pipe(
      catchError(this.handleError(`getTask id=${id}`))
    );
  }

  putTask(task: Task): Observable<any> {
    return this.http.put<Task>(this.taskUrl, task, httpOptions).pipe(
      catchError(this.handleError('putTask'))
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.post<Task>(this.taskUrl, task, httpOptions).pipe(
      catchError(this.handleError(`updateTask id=${task.id}`))
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<Task>(this.taskUrl + `/${id}`, httpOptions).pipe(
      catchError(this.handleError(`deleteTask id=${id}`))
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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
