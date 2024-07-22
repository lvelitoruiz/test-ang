import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { TaskService } from '../../task.service';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() => this.taskService.getTasks().pipe(
        map(paginatedResponse => TaskActions.loadTasksSuccess({ paginatedResponse })),
        catchError(error => of(TaskActions.loadTasksFailure({ error })))
      ))
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.addTask),
      tap(action => console.log('Add task action received:', action)),
      mergeMap(action => this.taskService.addTask(action.task).pipe(
        tap(newTask => console.log('New task created:', newTask)),
        map(task => TaskActions.addTaskSuccess({ task })),
        catchError(error => {
          console.error('Error adding task:', error);
          return of(TaskActions.addTaskFailure({ error }));
        })
      ))
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      tap(action => console.log('Update task action received in effect:', action)),
      mergeMap(action => this.taskService.updateTask(action.task).pipe(
        tap(updatedTask => console.log('Response from updateTask service:', updatedTask)),
        map(task => TaskActions.updateTaskSuccess({ task })),
        catchError(error => {
          console.error('Error in updateTask effect:', error);
          return of(TaskActions.updateTaskFailure({ error }));
        })
      ))
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(action => this.taskService.deleteTask(action.id).pipe(
        map(() => TaskActions.deleteTaskSuccess({ id: action.id })),
        catchError(error => of(TaskActions.deleteTaskFailure({ error })))
      ))
    );
  });
}