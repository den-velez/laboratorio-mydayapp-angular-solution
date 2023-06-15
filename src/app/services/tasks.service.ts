import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskModel, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private nextTaskId: number = 0;
  private tasksList: TaskModel[] = [];
  private myTaskList = new BehaviorSubject<TaskModel[]>([]);
  public myTaskList$ = this.myTaskList.asObservable();

  constructor(private storageService: StorageService) {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const taskOnStorage = this.storageService.getLocalStorage();
    if (taskOnStorage.length > 0) {
      this.tasksList = taskOnStorage;
      this.nextTaskId = this.findNextIdTask(taskOnStorage);
      this.myTaskList.next(this.tasksList);
    }
  }

  subscribeToChanges(): void {
    this.myTaskList$.subscribe((data) => {
      this.storageService.saveLocalStorage(data);
    });
  }

  findNextIdTask(tasks: TaskModel[]) {
    const taskCounterIndex = tasks.length - 1;
    const lastTaskId = parseInt(tasks[taskCounterIndex].id, 10);
    const nextId = typeof lastTaskId === 'number' ? lastTaskId + 1 : Date.now();

    return nextId;
  }

  getAllTasks() {
    return this.tasksList;
  }

  findTaskIndex(id: string) {
    return this.tasksList.findIndex((task) => task.id === id);
  }

  taskFilter(status: 'all' | 'pending' | 'completed') {
    if (status === 'all') {
      return this.getAllTasks();
    } else {
      const statusToFilter = status === 'pending' ? false : true;
      return this.tasksList.filter((task) => task.completed === statusToFilter);
    }
  }

  add({ title }: CreateTaskDTO) {
    const newTask: TaskModel = {
      id: this.nextTaskId.toString(),
      completed: false,
      title,
    };

    this.nextTaskId = this.nextTaskId + 1;
    this.tasksList.push(newTask);
    this.myTaskList.next(this.tasksList);
    this.subscribeToChanges();
  }

  update(id: string, title: string) {
    const taskIndexToUpdate = this.findTaskIndex(id);
    this.tasksList[taskIndexToUpdate].title = title;
    this.myTaskList.next(this.tasksList);
    this.subscribeToChanges();
  }

  delete(id: string) {
    const newTasks = this.tasksList.filter((task) => task.id != id);
    this.tasksList = newTasks;
    this.myTaskList.next(this.tasksList);
    this.subscribeToChanges();
  }

  complete(id: string) {
    const taskIndexToComplete = this.findTaskIndex(id);
    console.log(taskIndexToComplete);
    const taskStatus = this.tasksList[taskIndexToComplete].completed;
    this.tasksList[taskIndexToComplete].completed = !taskStatus;
    this.myTaskList.next(this.tasksList);
    this.subscribeToChanges();
  }

  cleanCompleted() {
    const remainTasks = this.tasksList.filter(
      (task) => task.completed === false
    );
    this.tasksList = remainTasks;
    this.myTaskList.next(this.tasksList);
    this.subscribeToChanges();
  }
}
