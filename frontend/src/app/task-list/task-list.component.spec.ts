import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskListComponent } from './task-list.component';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { Task } from '../models/task.model';
import * as TaskSelectors from '../store/selectors/task.selectors';
import * as TaskActions from '../store/actions/task.actions';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  let dialog: MatDialog;

  const initialState = {
    tasks: [],
    loading: false,
    error: null,
    totalTasks: 0,
    filteredTotalTasks: 0,
    currentPage: 1,
    totalPages: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        FontAwesomeModule,
        MatDialogModule,
        HttpClientTestingModule, // Añade HttpClientTestingModule aquí
        TaskEditModalComponent,
        TaskDetailModalComponent,
        TaskListComponent // Importa el componente standalone aquí
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue({
              afterClosed: () => of(null)
            })
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    // Mock selectors
    store.overrideSelector(TaskSelectors.selectFilteredTasks, []);
    store.overrideSelector(TaskSelectors.selectTasksLoading, false);
    store.overrideSelector(TaskSelectors.selectTasksError, null);
    store.overrideSelector(TaskSelectors.selectTotalTasks, 0);
    store.overrideSelector(TaskSelectors.selectFilteredTasksCount, 0);
    store.overrideSelector(TaskSelectors.selectCurrentPage, 1);
    store.overrideSelector(TaskSelectors.selectTotalPages, 1);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.loadTasks());
  });

  it('should update task', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const task: Task = {
      taskId: 1,
      title: 'Test Task',
      description: 'Test Description',
      category: 'hogar',
      priority: 'importante',
      completed: false,
      imageUrl: 'test-url',
      createdAt: new Date()
    };
    component.updateTask(task);
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.updateTask({ task }));
  });

  it('should delete task', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.deleteTask(1);
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.deleteTask({ id: 1 }));
  });

  it('should filter tasks by category', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.filterByCategory('hogar');
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.filterTasksByCategory({ category: 'hogar' }));
  });

  it('should filter tasks by status', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.filterByStatus('completed');
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.filterTasksByStatus({ status: 'completed' }));
  });

  it('should change page', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const pageEvent = { pageIndex: 1, pageSize: 10 } as any;
    component.onPageChange(pageEvent);
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.changePage({ page: 2, pageSize: 10 }));
  });
});
