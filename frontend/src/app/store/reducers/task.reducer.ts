import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TaskActions from '../actions/task.actions';
import { Task } from '../../models/task.model';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: any;
  totalTasks: number;
  currentPage: number;
  totalPages: number;
  categoryFilter: string;
  statusFilter: string;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.taskId
});

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null,
  totalTasks: 0,
  currentPage: 1,
  totalPages: 1,
  categoryFilter: 'all',
  statusFilter: 'all'
});

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { paginatedResponse }) => {
    return adapter.setAll(paginatedResponse.tasks, {
      ...state,
      loading: false,
      totalTasks: paginatedResponse.totalTasks,
      currentPage: paginatedResponse.currentPage,
      totalPages: paginatedResponse.totalPages
    });
  }),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => {
    console.log('Adding task to state:', task);
    return adapter.addOne(task, {
      ...state,
      loading: false,
      error: null
    });
  }),
  on(TaskActions.updateTaskSuccess, (state, { task }) => {
    return adapter.updateOne(
      { id: task.taskId, changes: task },
      { ...state, loading: false, error: null }
    );
  }),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => {
    return adapter.removeOne(id, {
      ...state,
      totalTasks: state.totalTasks - 1
    });
  }),
  on(TaskActions.filterTasksByCategory, (state, { category }) => ({
    ...state,
    categoryFilter: category
  })),
  on(TaskActions.filterTasksByStatus, (state, { status }) => ({
    ...state,
    statusFilter: status
  }))
);