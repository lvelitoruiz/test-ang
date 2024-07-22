import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDetailModalComponent } from './task-detail-modal.component';
import { Task } from '../models/task.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('TaskDetailModalComponent', () => {
  let component: TaskDetailModalComponent;
  let fixture: ComponentFixture<TaskDetailModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TaskDetailModalComponent>>;

  const mockTask: Task = {
    taskId: 1,
    title: 'Test Task',
    description: 'This is a test task description',
    completed: false,
    category: 'trabajo',
    imageUrl: 'http://example.com/image.jpg',
    priority: 'normal'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        TaskDetailModalComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { task: mockTask } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h3'));
    expect(titleElement).toBeTruthy(); // Verifica que el elemento existe
    expect(titleElement.nativeElement.textContent.trim().toLowerCase()).toContain('test task');
  });

  it('should display task description', () => {
    const descElement = fixture.debugElement.query(By.css('p'));
    expect(descElement.nativeElement.textContent).toContain('This is a test task description');
  });

  it('should display default image if imageUrl is not provided', () => {
    component.data.task.imageUrl = '';
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.properties['src']).toContain('https://res.cloudinary.com/dalvenjha/image/upload/v1721383219/oibe7ytivwpyu5jsp5nw.webp');
  });

  it('should close dialog when onClose is called', () => {
    component.onClose();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should show correct icon based on task completion status', () => {
    const iconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(iconElement.nativeElement.textContent.trim()).toBe('check_box_outline_blank');

    component.data.task.completed = true;
    fixture.detectChanges();
    expect(iconElement.nativeElement.textContent.trim()).toBe('check_box');
  });
});