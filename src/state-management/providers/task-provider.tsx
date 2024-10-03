import React, { useReducer } from "react";
import { tasksReducer } from "../reducers/task-reducers";
import TaskContext from "../contexts/taskContext";

interface Props {
  children: React.ReactNode;
}
const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
