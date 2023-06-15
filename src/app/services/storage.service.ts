import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageLabel = 'mydayapp-angular';

  saveLocalStorage(tasks: TaskModel[]) {
    localStorage.setItem(this.localStorageLabel, JSON.stringify(tasks));
  }

  getLocalStorage() {
    const taskListString = localStorage.getItem(this.localStorageLabel);
    return taskListString ? JSON.parse(taskListString) : [];
  }
}
