import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder} from "@angular/forms";
import { formatDate } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { TaskStatus } from '../../service/taskstatus';
import { Task } from '../../service/task'
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  options: DatepickerOptions = {
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
  };

  editTask: Task;
  editForm: FormGroup;

  constructor(private taskService: TaskService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      "name": [''],
      "date": ['']
    });
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => {
        this.editTask = task;

        this.editForm.setValue({
          "name": this.editTask.name,
          "date": new Date(this.editTask.date)
        });
      });
  }

  onSubmit(): void {
    this.editTask.name = this.editForm.value["name"];
    this.editTask.date = this.editForm.value["date"];
    this.taskService.updateTask(this.editTask).subscribe();
    this.router.navigate(["/calendar/dashboard"]);
  }

  onCancel(): void {
    this.router.navigate(["/calendar/dashboard"]);
  }
}
