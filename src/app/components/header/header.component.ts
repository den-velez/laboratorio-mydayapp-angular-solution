import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private tasksService: TasksService) {}

  titleTemporary = '';

  addNewTask() {
    const title = this.titleTemporary.trim();
    this.tasksService.add({ title });
    this.titleTemporary = '';
  }
}
