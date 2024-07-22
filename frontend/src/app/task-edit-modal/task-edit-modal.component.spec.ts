import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa el módulo de animaciones
import { TaskEditModalComponent } from './task-edit-modal.component';
import { Task } from '../models/task.model';

describe('TaskEditModalComponent', () => {
  let component: TaskEditModalComponent;
  let fixture: ComponentFixture<TaskEditModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TaskEditModalComponent>>;
  let mockDialogData: { task: Task | null };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialogData = { task: null };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule, 
        TaskEditModalComponent 
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when task data is null', () => {
    expect(component.taskForm.value).toEqual({
      title: '',
      description: '',
      category: '',
      priority: 'normal',
      imageUrl: '',
    });
  });

  it('should initialize form with task data when provided', () => {
    const taskData: Task = {
      taskId: 1,
      title: 'Test Task',
      description: 'Test Description',
      category: 'hogar',
      priority: 'importante',
      completed: false,
      imageUrl: 'test-url',
      createdAt: new Date(),
    };
    component.data.task = taskData;
    component.ngOnInit();
    expect(component.taskForm.value).toEqual({
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      priority: taskData.priority,
      imageUrl: taskData.imageUrl,
    });
  });

  it('should close dialog with task data on save', () => {
    const taskData: Task = {
      taskId: 1,
      title: 'Test Task',
      description: 'Test Description',
      category: 'hogar',
      priority: 'importante',
      completed: false,
      imageUrl: 'test-url',
      createdAt: new Date(),
    };
    component.taskForm.setValue({
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      priority: taskData.priority,
      imageUrl: taskData.imageUrl,
    });

    component.onSave();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...component.data.task,
      ...component.taskForm.value,
    });
  });

  it('should close dialog without data on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should disable save button when form is invalid', () => {
    component.taskForm.controls['title'].setValue('');
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector(
      'button[color="primary"]'
    );
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should enable save button when form is valid', () => {
    component.taskForm.controls['title'].setValue('Valid Title');
    component.taskForm.controls['category'].setValue('hogar');
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector(
      'button[color="primary"]'
    );
    expect(saveButton.disabled).toBeFalsy();
  });

});
