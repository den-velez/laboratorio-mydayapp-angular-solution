import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-footer',
  templateUrl: './task-footer.component.html',
})
export class TaskFooterComponent {
  filterSelected: string = 'all';

  @Output() filter = new EventEmitter<'all' | 'pending' | 'completed'>();

  @Input() counterLeft!: number;
  @Input() counter!: number;
  @Input() counterLeftLabel!: string;

  constructor(private tasksService: TasksService) {}

  cleanCompletedTasks() {
    this.tasksService.cleanCompleted();
  }

  onFilter(filterLabel: 'all' | 'pending' | 'completed') {
    this.filterSelected = filterLabel;
    this.filter.emit(filterLabel);
  }
}
