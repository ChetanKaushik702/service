import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

export default function ProtectedRoute({ children, role, ...rest }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={() => {
        if (loading) {
          return <Loader />;
        }
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }
        if (role && user?.role !== role) {
          return <Redirect to="/" />;
        }
        return children;
      }}
    />
  );
}
