import React from "react";
//import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Login from "./pages/Login";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Login />;
  }

  return children;
};

export default Protected;
