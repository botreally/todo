import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  task?: Task;

  constructor(private router: Router, private fb: FormBuilder, private api: ApiService) {
    this.form = fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.api.selectedTask != null) {
      this.task = this.api.selectedTask;
    }
    if (this.task != undefined) {
      this.form = this.fb.group({
          title: [this.task.title, Validators.required],
          description: [this.task.description, Validators.required],
          dueDate: [this.task.dueDate, Validators.required]
      });
    }
  }

  postTask(task: Task) {
    this.api.addTask(task).subscribe({
      complete: () => {
        this.router.navigate(["/"]);
      }
    });
  }

  putTask(task: Task) {
    if (this.task != undefined) {
      task["id"] = this.task.id;
      task["index"] = this.task.index;
      task["complete"] = this.task.complete;
      this.api.updateTask(task).subscribe({
        complete: () => {
          this.router.navigate(["/"]);
        }
      });
    }
  }

  deleteTask() {
    if (this.task != undefined) {
      this.api.deleteTask(this.task.id).subscribe({
        complete: () => {
          this.router.navigate(["/"]);
        }
      });
    }
  }

}
