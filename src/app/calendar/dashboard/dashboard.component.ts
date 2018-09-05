import { Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { Task } from '../../service/task';
import { TaskStatus }  from '../../service/taskstatus';
import { Params } from '@angular/router'
import { THIS_EXPR } from '../../../../node_modules/@angular/compiler/src/output/output_ast';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChildren(NbPopoverDirective) poopovers !: QueryList<NbPopoverDirective>;

  tasks: Task[];
    mon: Task[];
    tue: Task[];
    wed: Task[];
    thu: Task[];
    fri: Task[];
    sat: Task[];
    sun: Task[];
  weekNumber: number;
  year: number;
  weekDate: Date;
  weekTitle: string = "aaaaaa";



  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    /*this.route.queryParams.subscribe(params => {
      this.weekNumber = params['week'];
      this.year = params['year'];
      });
*/

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.weekNumber = +params['week'];
      this.year = +params['year'];
      console.log(this.weekNumber + ' ' + this.year);
    });

    if (this.weekNumber == null || this.year == null || isNaN(this.year) || isNaN(this.weekNumber)){
      let d = new Date();
      this.weekNumber = +formatDate(d, 'w', 'en');
      this.year = +formatDate(d, 'y', 'en');
    }
    this.weekDate = this.getDateOfWeek(this.weekNumber, this.year);
    this.weekTitle = this.buildTitle(this.weekDate);
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
    let currentWeekTasks: Task[] = this.tasks.filter(task => this.weekNumber === +formatDate(task.date, 'w', 'en')
                                                          && this.year === +formatDate(task.date, 'y', 'en'));
    this.mon = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Monday");
    this.tue = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Tuesday");
    this.wed = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Wednesday");
    this.thu = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Thursday");
    this.fri = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Friday");
    this.sat = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Saturday");
    this.sun = currentWeekTasks.filter(task => formatDate(task.date, 'EEEE', 'en') == "Sunday");
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.divByDate();
    this.taskService.deleteTask(task.id).subscribe();
    this.poopovers.forEach((item, _1, _2) => item.hide());
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

  checkboxChange(task: Task, value: any) {
    if(value.returnValue == null) {
      task.taskStatus = TaskStatus.CHECKED;
    }
    else {
      task.taskStatus = TaskStatus.UNCHECKED;
    }
    this.taskService.updateTask(task).subscribe();
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

  buildTitle(date: Date){
    var title = "" + date.getDate() + "." + (+date.getMonth() + 1) + "." + date.getFullYear() + " - ";
    date.setDate(date.getDate() + 6);
    title += date.getDate() + "." + (+date.getMonth() + 1) + "." + date.getFullYear();
    return title;
  }

  getDateOfWeek(week : number, year : number) {
    var day = (1 + (week - 1) * 7);
    var date = new Date(year, 0, day)

    date.setDate(date.getDate() - date.getDay())
    return date;
  }

  nextWeek() :void {
    this.weekDate.setDate(this.weekDate.getDate() + 7);
    let path = `/calendar/dashboard/${this.weekDate.getFullYear()}/${formatDate(this.weekDate, 'w', 'en')}`;
    console.log(path);
    this.router.navigate([path]);

  }

  previousWeek(){
    this.weekDate.setDate(this.weekDate.getDate() - 7);
    let path = `/calendar/dashboard/${this.weekDate.getFullYear()}/${formatDate(this.weekDate, 'w', 'en')}`;
    console.log(path);
    this.router.navigate([path]);
  }
}
