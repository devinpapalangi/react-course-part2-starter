import React from "react";
import AuthContext from "../contexts/authContext";

const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export default useAuthContext;
