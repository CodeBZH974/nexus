import { Link, ListItem, ListItemText, Typography, listItemClasses } from '@mui/material';
import AnchorLinkContainer from 'components/base/AnchorLinkContainer';
import Code from 'components/base/Code';
import CodeBlock from 'components/common/CodeBlock';
import DocNestedSection from 'components/docs/DocNestedSection';
import DocPageLayout from 'components/docs/DocPageLayout';
import DocSection, { DocList, DocSubtitle } from 'components/docs/DocSection';

const Authentication = () => {
  return (
    <DocPageLayout
      pageHeaderProps={{
        title: 'Authentication',
        descriptionEl: (
          <Typography sx={{ color: 'text.secondary' }}>
            Aurora offers multiple authentication methods. These options are customizable to meet
            specific user requirements.
          </Typography>
        ),
      }}
    >
      <DocSection title="How It Works">
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Aurora's authentication system is designed to be flexible, allowing developers to choose
          from various authentication methods. These methods are implemented using React Context
          Providers, and each method has its own dedicated provider file, offering a consistent
          interface for managing user sessions.
        </Typography>
        <DocSubtitle mb={2}>Supported Authentication Methods:</DocSubtitle>
        <DocList sx={{ color: 'text.secondary', mb: 5 }}>
          <ListItem>JSON Web Token (JWT) (Default)</ListItem>
          
        </DocList>

        <DocSubtitle mb={2}>Context Providers:</DocSubtitle>
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Each method has a corresponding context provider responsible for handling authentication
          logic, such as managing user sessions and signout functionality. The context providers are
          located in the following paths:
        </Typography>
        <DocList sx={{ mb: 2 }}>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                AuthProvider:{' '}
              </DocSubtitle>
              <Code>src/providers/AuthProvider.jsx</Code>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                JWT Provider:{' '}
              </DocSubtitle>
              <Code>src/providers/auth-provider/AuthJwtProvider.jsx</Code>
            </ListItemText>
          </ListItem>
          
        </DocList>

        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
          These providers expose several key functions and values:
        </Typography>

        <DocList sx={{ mb: 5 }}>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                sessionUser:{' '}
              </DocSubtitle>
              The currently authenticated user.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                setSessionUser:{' '}
              </DocSubtitle>
              Function to set the authenticated user.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                setSession:{' '}
              </DocSubtitle>
              Function to initialize a session with a user and token.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                signout:{' '}
              </DocSubtitle>
              Function to clear the session and sign out the user.
            </ListItemText>
          </ListItem>
        </DocList>

        <DocSubtitle mb={2}>Root Auth Provider:</DocSubtitle>
        <Typography sx={{ color: 'text.secondary' }}>
          The <Code>AuthProvider</Code> component in Aurora acts as the root provider, where all the
          individual authentication providers are imported. Users can easily switch between
          authentication methods by commenting out the provider they need.
        </Typography>
        <CodeBlock
          code={`import { PropsWithChildren, use } from 'react';
import SocialAuthProvider from './auth-provider/SocialAuthProvider';

import AuthJwtProvider, { AuthJwtContext } from './auth-provider/AuthJwtProvider';

const AuthMethodProvider = AuthJwtProvider; // Choose the provider here
const AuthMethodContext = AuthJwtContext; // Choose the context here

const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthMethodProvider>
      <SocialAuthProvider>{children}</SocialAuthProvider>
    </AuthMethodProvider>
  );
};

export const useAuth = () => use(AuthMethodContext);

export default AuthProvider;`}
        />
        <DocSubtitle mb={2} mt={5}>
          Auth Consumer:
        </DocSubtitle>
        <Typography sx={{ color: 'text.secondary' }}>
          The <Code>AuthProvider</Code> component also exports the <Code>useAuth</Code> hook, which
          serves as a consumer for the authentication context. This hook provides access to the
          authentication-related functions and data. You can use this hook to interact with the
          authentication state and functions throughout your application.
        </Typography>
        <CodeBlock
          code={`const { sessionUser, setSessionUser, setSession, signout } = useAuth();`}
        />

        <DocSubtitle mb={2} mt={5}>
          Authentication Pages:
        </DocSubtitle>
        <Typography sx={{ color: 'text.secondary' }}>
          The authentication page components are organized in <Code>src/pages/authentication</Code>{' '}
          folder. Each method (e.g., JWT) has its own directory containing relevant
          components like Login, Signup, ForgotPassword, etc.
        </Typography>
      </DocSection>
      <DocSection title="How To Use">
        <DocList
          sx={{
            listStyleType: 'decimal',
          }}
        >
          <DocNestedSection
            component={ListItem}
            id="jwt"
            title="Jwt"
            titleEl={
              <AnchorLinkContainer hashHref="jwt" anchorSize="small">
                <DocSubtitle>JWT Authentication</DocSubtitle>
              </AnchorLinkContainer>
            }
          >
            <DocList
              sx={{
                color: 'text.secondary',
                mb: 5,
              }}
            >
              <ListItem>
                <Typography sx={{ mb: 1 }}>
                  JWT is a custom authentication method that requires a backend server configured to
                  handle JWT-based authentication. You need to implement JWT authentication on your
                  backend and create the necessary endpoints.
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  By default, Aurora includes dummy endpoints and uses SWR for making requests. You
                  can find the request hooks in{' '}
                  <Code>src/services/swr/api-hooks/useAuthApi.js</Code>, which includes hooks such
                  as <Code>useLoginUser</Code> and <Code>useRegisterUser</Code> for handling
                  authentication requests.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Add <Code>VITE_API_URL</Code> environment variable in your <Code>.env</Code> file.
                </Typography>{' '}
                <CodeBlock code={`VITE_API_URL=`} />
              </ListItem>
              <ListItem>
                <Typography>
                  Uncomment the <Code>AuthJwtProvider</Code> import statement and set the
                  <Code>AuthMethodProvider</Code> and <Code>AuthMethodContext</Code> variables:
                </Typography>
                <CodeBlock
                  sx={{ mb: 0 }}
                  code={`import AuthJwtProvider, { AuthJwtContext } from './auth-provider/AuthJwtProvider';
                    
const AuthMethodProvider = AuthJwtProvider;
const AuthMethodContext = AuthJwtContext;`}
                />
              </ListItem>
            </DocList>
            <DocSubtitle sx={{ mb: 2 }}>Remove JWT Method</DocSubtitle>
            <Typography sx={{ color: 'text.secondary' }}>
              If you do not need the JWT authentication method, follow these steps to remove it:
            </Typography>
            <DocList
              sx={{
                color: 'text.secondary',
                mb: 5,
                [`& .${listItemClasses.root}`]: {
                  my: 1,
                },
              }}
            >
              <ListItem>
                Delete the <Code>src/providers/auth-provider/AuthJwtProvider.jsx</Code> file.
              </ListItem>
              <ListItem>
                Comment out or remove the import statement for <Code>AuthJwtProvider</Code> and{' '}
                <Code>AuthJwtContext</Code>
                <CodeBlock
                  sx={{ mb: 0 }}
                  code={`// import AuthJwtProvider, { AuthJwtContext } from './auth-provider/AuthJwtProvider';`}
                />
              </ListItem>
              <ListItem>
                Delete the JWT authentication-related UI pages located in{' '}
                <Code>src/pages/authentication/default/jwt</Code>
                folder and any associate router declarations in <Code>src/routes/router.jsx</Code>
              </ListItem>
            </DocList>
          </DocNestedSection>
          
          

          
        </DocList>
      </DocSection>
      <DocSection title="Authentication Paths Configuration">
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
          After selecting an authentication provider, you should use the <Code>authPaths</Code>{' '}
          object to keep paths aligned with the chosen provider. Instead of directly using specific
          paths like <Code>paths.defaultJwtLogin</Code>, reference <Code>authPaths.login</Code>,
          <Code>authPaths.signup</Code>, etc., to ensure provider-specific routing across the
          application.
        </Typography>
        <DocSubtitle>Setting Default Authentication Paths</DocSubtitle>
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
          To set the default authentication provider, configure <Code>authPaths</Code> in{' '}
          <Code>apps/vite-ts/src/routes/paths.js</Code>:
        </Typography>
        <CodeBlock
          sx={{ mb: 0 }}
          code={`export const authPaths = {
  /* ---------------------------------JWT----------------------------------------- */
  login: paths.defaultJwtLogin,
  signup: paths.defaultJwtSignup,
  forgotPassword: paths.defaultJwtForgotPassword,
  setNewPassword: paths.defaultJwtSetPassword,
  twoFactorAuth: paths.defaultJwt2FA,
  
};`}
        />

        
      </DocSection>
      <DocSection title="Guards">
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Aurora uses route guards to control access to certain routes based on the user's
          authentication status. There are two primary route guards:
        </Typography>
        <DocList sx={{ color: 'text.secondary' }}>
          <ListItem sx={{ mb: 5 }}>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                AuthGuard:
              </DocSubtitle>{' '}
              Protects routes that should only be accessible to authenticated users. If a user is
              not authenticated, they will be redirected to the login page.
            </ListItemText>
            <Typography sx={{ mt: 2 }}>Implementation Example:</Typography>
            <CodeBlock
              sx={{ mb: 0 }}
              code={`{
  path: '/dashboard',
  element: (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    ...
  ]
}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText disableTypography>
              <DocSubtitle component="span" sx={{ color: 'text.primary' }}>
                GuestGuard:
              </DocSubtitle>{' '}
              Protects routes that should only be accessible to non-authenticated (guest) users. If
              an authenticated user tries to access a route protected by this guard, they will be
              redirected to the homepage.
            </ListItemText>
            <Typography sx={{ mt: 2 }}>Implementation Example:</Typography>
            <CodeBlock
              sx={{ mb: 0 }}
              code={`{
  path: '/auth',
  element: (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  ),
  children: [
    ...
  ]
}`}
            />
          </ListItem>
        </DocList>
        <Typography
          sx={{
            my: 2,
          }}
        >
          Both <Code>AuthGuard</Code> and <Code>GuestGuard</Code> have been commented out
          temporarily for development and testing purposes. This allows unrestricted access to
          routes while testing without being redirected based on authentication status. Uncomment
          this guard when you are ready to implement authentication.
        </Typography>
      </DocSection>
    </DocPageLayout>
  );
};

export default Authentication;
