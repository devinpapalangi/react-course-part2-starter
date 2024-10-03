import { createContext } from "react";
import { Task, TaskAction } from "../reducers/task-reducers";

interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export default TaskContext;
