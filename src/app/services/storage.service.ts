import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageLabel = 'mydayapp-angular';

  saveLocalStorage(tasks: TaskModel[]) {
    localStorage.setItem(this.localStorageLabel, JSON.stringify(tasks));
  }

  getLocalStorage(): TaskModel[] | null {
    const taskListString = localStorage.getItem(this.localStorageLabel);
    const taskList = taskListString ? JSON.parse(taskListString) : null;
    return taskList;
  }
}
