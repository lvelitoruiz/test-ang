import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { PaginatedTasksResponse } from '../../models/paginated-tasks-response.model';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ paginatedResponse: PaginatedTasksResponse }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: number }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: any }>());

export const filterTasksByCategory = createAction('[Task] Filter Tasks By Category', props<{ category: string }>());
export const filterTasksByStatus = createAction('[Task] Filter Tasks By Status', props<{ status: string }>());
export const changePage = createAction('[Task] Change Page', props<{ page: number, pageSize: number }>());