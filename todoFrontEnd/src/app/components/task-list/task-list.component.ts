import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/types';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  todo: Task[] = [];
  done: Task[] = [];  

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchData();
  }

  updateComplete(task: Task) {
    task.complete = !task.complete;
    this.api.updateTask(task).subscribe();
  }

  selectTask(task: Task) {
    console.log(task);
    this.api.selectTask(task);
  }

  unselectTask() {
    this.api.unselectTask();
  }

  fetchData() {
    this.api.getTasks().subscribe(result => {
      console.log("Get Tasks");
      this.todo = [];
      this.done = [];
      result.forEach(task => {
        if (!task.complete) {
          this.todo.push(task);
        } else {
          this.done.push(task);
        }
      });
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.updateList(event.container.data);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.updateComplete(event.container.data[event.currentIndex]);

      this.updateList(event.container.data);
      this.updateList(event.previousContainer.data);
    }
  }

  showDetails(task: Task) {
    this.api.selectTask(task);
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  updateList(list: Task[]) {
    for (let i = 0; i < list.length; i++) {
      list[i].index = i;
      this.api.updateTask(list[i]).subscribe();
    }
  }
}