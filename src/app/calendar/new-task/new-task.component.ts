import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder} from "@angular/forms";
import { TaskService } from '../../service/task.service';
import { TaskStatus } from '../../service/taskstatus';
import { Task } from '../../service/task'
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
/*
  datePickerConfig = {
    min: new Date(Date.now())
  }
*/
  options: DatepickerOptions = {
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
  };

  createForm: FormGroup;

  constructor(private taskService: TaskService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
        this.createForm = this.formBuilder.group({
            "name": new FormControl("", []),
            "date": new Date(Date.now())
        });
  }

  onSubmit(): void {
    this.taskService.putTask({ id: 0, taskStatus: TaskStatus    .UNCHECKED, name: this.createForm.value["name"],
                              date: this.createForm.value["date"], userId: "", category: ""}).subscribe();
    this.router.navigate(["/calendar/dashboard"]);
  }

  onCancel(): void {
    this.router.navigate(["/calendar/dashboard"]);
  }
}
