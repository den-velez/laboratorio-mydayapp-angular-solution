import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
})
export class TaskContainerComponent implements OnInit {
  mytasks: TaskModel[] = [];
  counter: number = 0;
  counterLeft: number = 0;
  counterLeftLabel: string = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.myTaskList$.subscribe((tasks) => {
      this.mytasks = tasks;
      this.counter = tasks.length || 0;

      const taskpending = tasks.reduce((total, task) => {
        if (!task.completed) {
          return total + 1;
        } else {
          return total;
        }
      }, 0);

      this.counterLeft = taskpending;
      this.counterLeftLabel = taskpending === 1 ? 'item left' : 'items left';
    });
  }

  onDelete(id: string) {
    this.tasksService.delete(id);
  }

  onComplete(task: TaskModel) {
    const { id } = task;
    this.tasksService.complete(id);
  }

  onUpdate(task: TaskModel) {
    const { id, title } = task;
    this.tasksService.update(id, title);
  }

  onTaskFilter(filter: 'all' | 'pending' | 'completed') {
    const filterApply = this.tasksService.taskFilter(filter);
    this.mytasks = filterApply;
  }
}
