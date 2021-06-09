import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/types';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss']
})
export class DetailDialogComponent {

  task?: Task

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<DetailDialogComponent>) {
      if (this.api.selectedTask !== undefined) {
        this.task = this.api.selectedTask;
      }
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    if (this.task != undefined) {
      this.api.deleteTask(this.task.id).subscribe({
        complete: () => {
          console.log("Complete");
          this.dialogRef.close();
        },
        error: err => {
          console.log("Error: " + err);
        }
      });
    }
  }
}
