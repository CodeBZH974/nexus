import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import PageLoader from 'components/loading/PageLoader';

const GuestGuard = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // Si un token existe, l'utilisateur est considéré comme connecté, on le redirige depuis les pages "invité".
  if (loading) return <PageLoader />;
  return user ? <Navigate to="/" /> : children;
};

export default GuestGuard;
