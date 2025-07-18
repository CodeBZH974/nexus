import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import LoginForm from 'components/sections/authentications/default/LoginForm';
import paths, { rootPaths } from 'routes/paths';

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
      // Après un login réussi, on redirige toujours vers la racine du tableau de bord.
      // Le AuthGuard s'assurera que la page est accessible.
      // Si l'utilisateur a été redirigé vers le login depuis une page protégée,
      // react-router gère souvent bien cette redirection, mais une redirection explicite est plus claire.
      navigate(rootPaths.root, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      // Leverage the full error object from axios to provide more specific feedback.
      const errorMessage =
        err.response?.data?.detail || 'Invalid username or password. Please try again.';
      setServerError(errorMessage);
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
