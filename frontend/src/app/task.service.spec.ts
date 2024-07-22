import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { PaginatedTasksResponse } from './models/paginated-tasks-response.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    const dummyResponse: PaginatedTasksResponse = {
      tasks: [],
      totalTasks: 0,
      currentPage: 1,
      totalPages: 1
    };

    service.getTasks().subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should add a task', () => {
    const dummyTask: Task = {
      taskId: 1, title: 'New Task', completed: false,
      description: '',
      priority: 'normal',
      category: 'hogar'
    };

    service.addTask(dummyTask).subscribe(task => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(dummyTask);
  });

  it('should update a task', () => {
    const dummyTask: Task = {
      taskId: 1, title: 'Updated Task', completed: true,
      description: '',
      priority: 'normal',
      category: 'hogar'
    };

    service.updateTask(dummyTask).subscribe(task => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne('/api/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyTask);
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe();

    const req = httpMock.expectOne('/api/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should toggle task complete status', () => {
    const dummyTask: Task = {
      taskId: 1, title: 'Task', completed: true,
      description: '',
      priority: 'normal',
      category: 'hogar'
    };

    service.toggleTaskComplete(1).subscribe(task => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne('/api/tasks/1/toggle-complete');
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyTask);
  });

  it('should get categories', () => {
    const dummyCategories = ['work', 'personal', 'shopping'];

    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne('/api/tasks/categories');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });

  it('should get priorities', () => {
    const dummyPriorities = ['low', 'medium', 'high'];

    service.getPriorities().subscribe(priorities => {
      expect(priorities).toEqual(dummyPriorities);
    });

    const req = httpMock.expectOne('/api/tasks/priorities');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPriorities);
  });
});