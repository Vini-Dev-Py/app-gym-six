import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
