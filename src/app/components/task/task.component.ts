import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  constructor(private renderer: Renderer2) {}
  @Input() task!: TaskModel;

  taskMode: 'view' | 'edit' = 'view';

  @Output() completed = new EventEmitter<TaskModel>();
  @Output() update = new EventEmitter<TaskModel>();
  @Output() delete = new EventEmitter<string>();

  @ViewChild('inputUpdate') inputElement!: ElementRef;

  newTitle: string = '';

  onUpdateStatus(task: TaskModel) {
    this.completed.emit(task);
  }

  onUpdateTitle(task: TaskModel, newTitle: string) {
    const titleSanitized = newTitle.trim();
    if (titleSanitized.length === 0) {
      this.viewMode();
      return;
    }
    const taskUpdated = {
      ...task,
      title: titleSanitized,
    };
    this.newTitle = titleSanitized;
    this.update.emit(taskUpdated);
    this.viewMode();
  }

  onDelete(idTask: string) {
    this.delete.emit(idTask);
  }

  editMode() {
    this.newTitle = this.task.title;
    this.taskMode = 'edit';
    console.log('os', this.newTitle, this.task.title);

    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  viewMode() {
    this.taskMode = 'view';
  }
}
