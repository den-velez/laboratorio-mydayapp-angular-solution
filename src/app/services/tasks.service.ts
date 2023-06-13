import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: TaskModel[] = [];

  fetchReadAndUpdate() {
    const tasksOnStorage = this.storageService.getLocalStorage();
    if (tasksOnStorage) {
      this.tasks = tasksOnStorage;
    }
  }

  create(task: TaskModel) {
    this.tasks.push(task);
  }

  update(id: string, title: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].title = title;
  }

  delete(id: string) {
    const newTasks = this.tasks.filter((task) => task.id != id);
    this.tasks = newTasks;
  }

  completeTask(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    const taskStatus = this.tasks[taskIndex].completed;
    this.tasks[taskIndex].completed = !taskStatus;
  }

  constructor(private storageService: StorageService) {}
}
