// src/app/models/task.model.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'normal' | 'importante' | 'urgente';
  category: 'hogar' | 'trabajo' | 'hobby' | 'compras' | 'salidas' | 'viajes';
  imageUrl?: string;
  createdAt?: Date;
}

export type NewTask = Omit<Task, 'taskId'> & { taskId?: number };
