import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  selectedTask?: Task;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>("http://localhost:8080/api/tasks");
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>("http://localhost:8080/api/tasks", task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:8080/api/tasks/${task.id}`, task);
  }
  
  deleteTask(id: number) {
    return this.http.delete<Task>(`http://localhost:8080/api/tasks/${id}`);
  }

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  unselectTask() {
    this.selectedTask = undefined;
  }
}
