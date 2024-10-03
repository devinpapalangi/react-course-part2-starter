export interface Task {
  id: number;
  title: string;
}

export interface AddTaskAction {
  type: "ADD_TASK";
  task: Task;
}

export interface DeleteTaskAction {
  type: "DELETE_TASK";
  id: number;
}

export type TaskAction = AddTaskAction | DeleteTaskAction;

export const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.task, ...tasks];
    case "DELETE_TASK":
      return tasks.filter((t) => t.id !== action.id);
  }
};
