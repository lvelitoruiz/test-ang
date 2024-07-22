import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, adapter } from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectTaskState);

export const selectAllTasks = selectAll;

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectTotalTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.totalTasks
);

export const selectCurrentPage = createSelector(
  selectTaskState,
  (state: TaskState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectTaskState,
  (state: TaskState) => state.totalPages
);

export const selectCategoryFilter = createSelector(
  selectTaskState,
  (state: TaskState) => state.categoryFilter
);

export const selectStatusFilter = createSelector(
  selectTaskState,
  (state: TaskState) => state.statusFilter
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectCategoryFilter,
  selectStatusFilter,
  (tasks, categoryFilter, statusFilter) => {
    return tasks.filter(task => {
      const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;
      const statusMatch = statusFilter === 'all' || 
        (statusFilter === 'completed' && task.completed) || 
        (statusFilter === 'pending' && !task.completed);
      return categoryMatch && statusMatch;
    });
  }
);

export const selectFilteredTasksCount = createSelector(
  selectFilteredTasks,
  (filteredTasks) => filteredTasks.length
);