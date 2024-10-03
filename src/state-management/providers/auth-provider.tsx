import React, { useReducer } from "react";
import authReducer from "../reducers/auth-reducers";
import AuthContext from "../contexts/authContext";

interface Props {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
