import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { TaskService } from '../../service/task.service';
import { TaskStatus } from '../../service/taskstatus';
import { Task } from '../../service/task'

@Component({
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
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

  createForm: FormGroup;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
        this.createForm = new FormGroup({
            "name": new FormControl("", []),
            "year": new FormControl("", []),
            "month": new FormControl("", []),
            "day": new FormControl("", [])
        });
  }

  onSubmit(): void {
    this.taskService.putTask({ id: 0, taskStatus: TaskStatus    .UNCHECKED, name: this.createForm.value["name"],
                              date: new Date(this.createForm.value["year"], this.createForm.value["month"], this.createForm.value["day"]), userId: "", category: ""}).subscribe();
    this.router.navigate(["/calendar/dashboard"]);
  }

  onCancel(): void {
    this.router.navigate(["/calendar/dashboard"]);
  }
}
