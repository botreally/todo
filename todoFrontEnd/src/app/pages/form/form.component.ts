import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
      this.form = fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          dueDate: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  postTask(task: Task) {
    this.api.addTask(task);
  }

}
