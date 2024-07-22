import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PaginatedTasksResponse } from './models/paginated-tasks-response.model';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<PaginatedTasksResponse> {
    return this.http.get<PaginatedTasksResponse>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    console.log('TaskService: Sending add task request:', task);
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(response => console.log('TaskService: Received response from add task:', response))
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }

  toggleTaskComplete(taskId: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}/toggle-complete`, {});
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getPriorities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/priorities`);
  }
}