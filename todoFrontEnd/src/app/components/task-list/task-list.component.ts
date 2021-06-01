import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTasks().subscribe(result => {
      console.log("Get Tasks");
      this.tasks = result;
    })
  }

  updateComplete(task: Task) {
    task.complete = !task.complete;
    
    this.api.updateTask(task);
  }

  selectTask(task: Task) {
    console.log(task);
    this.api.selectTask(task);
  }
}
