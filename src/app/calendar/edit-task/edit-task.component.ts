import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { TaskStatus } from '../../service/taskstatus';
import { Task } from '../../service/task'

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  months = [
    { name: "January", id: 0 },
    { name: "February", id: 1},
    { name: "March", id: 2 },
    { name: "April", id: 3 },
    { name: "May", id: 4 },
    { name: "June", id: 5 },
    { name: "July", id: 6 },
    { name: "August", id: 7 },
    { name: "September", id: 8 },
    { name: "October", id: 9 },
    { name: "November", id: 10 },
    { name: "December", id: 11 },
  ];

  editTask: Task;
  createForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
        this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => {
        this.editTask = task;
        this.createForm = new FormGroup({
            "name": new FormControl("", []),
            "year": new FormControl("", []),
            "month": new FormControl("", []),
            "day": new FormControl("", [])
        });
        this.createForm.setValue({
          name: this.editTask.name,
          year: +formatDate(this.editTask.date, 'y', 'en'),
          month: +formatDate(this.editTask.date, 'M', 'en'),
          day: +formatDate(this.editTask.date, 'd', 'en')
        });
      });
  }

  onSubmit(): void {
    this.editTask.name = this.createForm.value["name"];
    this.editTask.date = new Date(this.createForm.value["year"], this.createForm.value["month"], this.createForm.value["day"]);
    this.taskService.updateTask(this.editTask).subscribe();
    this.router.navigate(["/calendar/dashboard"]);
  }

  onCancel(): void {
    this.router.navigate(["/calendar/dashboard"]);
  }
}
