import { useContext, useReducer, useState } from "react";
import authReducer from "./reducers/auth-reducers";
import AuthContext from "./contexts/authContext";
import useAuthContext from "./hooks/use-auth-context";

const LoginStatus = () => {
  const { user, dispatch } = useAuthContext();
  const onLogut = () => dispatch({ type: "LOGOUT" });
  const onLogin = () => dispatch({ type: "LOGIN", username: "mosh.hamedani" });

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={onLogut} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={onLogin} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
