import { useReducer } from "react";
import "./App.css";
import TaskContext from "./state-management/contexts/taskContext";
import HomePage from "./state-management/HomePage";
import LoginStatus from "./state-management/LoginStatus";
import { tasksReducer } from "./state-management/reducers/task-reducers";
import NavBar from "./state-management/NavBar";
import AuthContext from "./state-management/contexts/authContext";
import authReducer from "./state-management/reducers/auth-reducers";
import AuthProvider from "./state-management/providers/auth-provider";
import TaskProvider from "./state-management/providers/task-provider";
import Counter from "./state-management/counters/counter";

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <NavBar />
          <HomePage />
          <Counter />
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
