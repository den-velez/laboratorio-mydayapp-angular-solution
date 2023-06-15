export interface TaskModel {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTaskDTO extends Omit<TaskModel, 'id' | 'completed'> {}

export interface UpdateTaskDTO extends Partial<TaskModel> {}
