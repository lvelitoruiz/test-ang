import { Task } from './task.model';

export interface PaginatedTasksResponse {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
  totalTasks: number;
}
