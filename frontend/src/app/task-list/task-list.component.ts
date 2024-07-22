import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import * as TaskActions from '../store/actions/task.actions';
import * as TaskSelectors from '../store/selectors/task.selectors';
import { AppState } from '../store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    TaskEditModalComponent,
    TaskDetailModalComponent,
    FontAwesomeModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  totalTasks$: Observable<number>;
  filteredTotalTasks$: Observable<number>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  categories: string[] = ['all', 'hogar', 'trabajo', 'hobby', 'compras', 'salidas', 'viajes'];
  faSquare = faSquare;
  faSquareCheck = faSquareCheck;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.tasks$ = this.store.pipe(select(TaskSelectors.selectFilteredTasks));
    this.loading$ = this.store.pipe(select(TaskSelectors.selectTasksLoading));
    this.error$ = this.store.pipe(select(TaskSelectors.selectTasksError));
    this.totalTasks$ = this.store.pipe(select(TaskSelectors.selectTotalTasks));
    this.filteredTotalTasks$ = this.store.pipe(select(TaskSelectors.selectFilteredTasksCount));
    this.currentPage$ = this.store.pipe(select(TaskSelectors.selectCurrentPage));
    this.totalPages$ = this.store.pipe(select(TaskSelectors.selectTotalPages));
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  getCategoryColorClass(category: string): string {
    const colorClasses = {
      'hogar': 'bg-orange-600',
      'trabajo': 'bg-green-600',
      'hobby': 'bg-yellow-600',
      'compras': 'bg-blue-600',
      'salidas': 'bg-pink-600',
      'viajes': 'bg-purple-600'
    };
  
    return colorClasses[category as keyof typeof colorClasses] || 'bg-gray-600';
  }

  openTaskModal(task?: Task) {
    const dialogRef = this.dialog.open(TaskEditModalComponent, {
      width: '560px',
      data: { task: task ? {...task} : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          this.store.dispatch(TaskActions.updateTask({ task: result }));
        } else {
          this.store.dispatch(TaskActions.addTask({ task: result }));
        }
      }
    });
  }

  updateTask(task: Task) {
    console.log('Updating task:', task);
    this.store.dispatch(TaskActions.updateTask({ task }));
  }

  deleteTask(taskId: number) {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }

  getUpdatedTask(task: Task): Task {
    return { ...task, completed: !task.completed };
  }

  filterByCategory(category: string) {
    this.store.dispatch(TaskActions.filterTasksByCategory({ category }));
  }

  filterByStatus(status: string) {
    this.store.dispatch(TaskActions.filterTasksByStatus({ status }));
  }

  onPageChange(event: PageEvent) {
    this.store.dispatch(TaskActions.changePage({ page: event.pageIndex + 1, pageSize: event.pageSize }));
  }

  openTaskDetailModal(task: Task) {
    this.dialog.open(TaskDetailModalComponent, {
      width: '400px',
      data: { task }
    });
  }
}