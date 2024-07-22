import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-edit-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.scss'],
})
export class TaskEditModalComponent implements OnInit {
  taskForm: FormGroup;
  categories = ['hogar', 'trabajo', 'hobby', 'compras', 'salidas', 'viajes'];
  priorities = ['normal', 'importante', 'urgente'];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null },
    private http: HttpClient
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      category: ['', Validators.required],
      priority: ['normal', Validators.required],
      imageUrl: [''],
    });
  }

  ngOnInit() {
    if (this.data.task) {
      this.taskForm.patchValue(this.data.task);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const task: Task = {
        ...this.data.task,
        ...this.taskForm.value
      };
      this.dialogRef.close(task);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'angular-tool');

      this.http
        .post(
          'https://api.cloudinary.com/v1_1/dalvenjha/image/upload',
          formData
        )
        .subscribe(
          (response: any) => {
            this.taskForm.patchValue({
              imageUrl: response.secure_url,
            });
          },
          (error) => {
            console.error('Error uploading file', error);
            if (error.error && error.error.error) {
              console.error('Cloudinary error:', error.error.error);
            }
          }
        );
    }
  }
}