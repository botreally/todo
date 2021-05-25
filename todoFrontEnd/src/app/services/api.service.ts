import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>("http://localhost:8080/api/tasks");
  }

  addTask(task: Task) {
    this.http.post("http://localhost:8080/api/tasks", task);
  }

  updateTask(task: Task) {
    this.http.put<Task>(`http://localhost:8080/api/tasks/${task.id}`, task).subscribe();
  }
  
  deleteTask(id: number) {
    this.http.delete(`http://localhost:8080/api/tasks/${id}`);
  }
}
