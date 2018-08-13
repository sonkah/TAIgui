import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { Task } from '../../service/task';
import { TaskStatus }  from '../../service/taskstatus'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task[];

    mon: Task[];
    tue: Task[];
    wed: Task[];
    thu: Task[];
    fri: Task[];
    sat: Task[];
    sun: Task[];
  currentWeek: number;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.currentWeek = +formatDate(new Date(), 'w', 'en');
    this.getTasks();

  }
  getTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.divByDate();
    });
  }

  divByDate(): void {
    let currentWeekTasks: Task[] = this.tasks.filter(t => this.currentWeek === +formatDate(t.date, 'w', 'en'));
    this.mon = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Monday");
    this.tue = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Tuesday");
    this.wed = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Wednesday");
    this.thu = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Thursday");
    this.fri = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Friday");
    this.sat = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Saturday");
    this.sun = currentWeekTasks.filter(t => formatDate(t.date, 'EEEE', 'en') == "Sunday");
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.divByDate();
    this.taskService.deleteTask(task.id).subscribe();
  }

   edit(task: Task) {
    this.router.navigate([`/calendar/edit-task/${task.id}`]);
  }

  newTask(): void {
    this.router.navigate(['/calendar/new-task']);
  }
  checkStatus(task: Task) {
    if(task.taskStatus == TaskStatus.CHECKED){
      return true;
    }
    else {
      return false;
    }
  }

  checkCancelled(task: Task) {
    if(task.taskStatus == TaskStatus.CANCELED){
      return false;
    }
    else {
      return true;
    }
  }

  getDetails(task: Task){
    return "Name: " + task.name + "\n" +
          "Status: " + task.taskStatus + "<br/>" +
          "Date: " + task.date + "\n" +
          ""
  }
}
