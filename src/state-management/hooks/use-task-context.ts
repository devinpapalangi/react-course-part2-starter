import React from "react";
import TaskContext from "../contexts/taskContext";

const useTaskContext = () => {
  return React.useContext(TaskContext);
};

export default useTaskContext;
