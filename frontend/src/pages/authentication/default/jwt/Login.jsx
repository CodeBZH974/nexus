import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import paths, { rootPaths } from 'routes/paths';
import LoginForm from 'components/sections/authentications/default/LoginForm';
import AuthContext from 'src/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const { login } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await login(data.username, data.password);
      const from = location.state?.from?.pathname || rootPaths.root;
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login submit error:', err);
      setServerError('Invalid username or password. Please try again.');
    }
  };

  return (
    <LoginForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      serverError={serverError}
      signUpLink={paths.defaultJwtSignup}
      forgotPasswordLink={paths.defaultJwtForgotPassword}
    />
  );
};

export default Login;
