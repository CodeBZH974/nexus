import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import paths from 'routes/paths';
import AuthContext from 'context/AuthContext';
import PageLoader from 'components/loading/PageLoader';

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) return <PageLoader />;
  return user ? children : <Navigate to={paths.defaultJwtLogin} state={{ from: location }} replace />;
};

export default AuthGuard;
