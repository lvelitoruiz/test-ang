import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../models/task.model';

import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
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
    FontAwesomeModule,
  ],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  onClose(): void {
    this.dialogRef.close();
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
}
