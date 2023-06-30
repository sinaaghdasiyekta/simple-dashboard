import { createContext, useEffect, useReducer } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import auth0 from 'auth0-js';
import PropTypes from 'prop-types';
import { auth0Config, hostURL } from '../config';
import { boringAvatarGenerator } from '../utils/boringAvatars';
import Logo from '../components/logo/Logo';

// ----------------------------------------------------------------------

const webAuth = new auth0.WebAuth({
  domain: auth0Config.domain,
  clientID: auth0Config.clientId,
  redirectUri: hostURL,
  responseType: 'token',
});

const initialState = {
  loading: false,
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const Types = {
  loading: 'LOADING',
  init: 'INITIALIZE',
  login: 'LOGIN',
  logout: 'LOGOUT',
  Register: 'REGISTER'
};

const reducer = (state, action) => {
  if (action.type === Types.loading) {
    const { loading } = action.payload;
    return { ...state, loading };
  }
  if (action.type === Types.init) {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }
  if (action.type === Types.login) {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  }
  if (action.type === Types.logout) {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
  if (action.type === Types.Register) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user
    };
  }
  return state;
};

const handleToken = (token, action) => {
  switch (action) {
    case 'save':
      localStorage.setItem('token', token);
      break;
    case 'read':
      return localStorage.getItem('token');
    case 'delete':
      localStorage.removeItem('token');
      break;
    default:
      break;
  }
  return '';
};

const AuthContext = createContext(null);


function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken = handleToken('', 'read');
    const isAuthenticated = !!accessToken;
    if (accessToken) {
      webAuth.client.userInfo(accessToken, (err, { email, name, sub }) => {
        if (err) throw err;
        const user = { email, name, sub };
        dispatch({
          type: Types.init,
          payload: { isAuthenticated, user }
        });
      });
    } else {
      dispatch({
        type: Types.init,
        payload: { isAuthenticated, user: null }
      });
    }
  }, []);

  const login = async (username, password) => {
    dispatch({ type: Types.loading, payload: { loading: true } });

    webAuth.client.login(
      {
        realm: auth0Config.connection,
        username,
        password,
      },
      (error, { accessToken }) => {
        if (error) throw error;
        handleToken(accessToken, 'save');
        webAuth.client.userInfo(accessToken, (err, { email, name, sub }) => {
          if (err) throw err;
          const user = { email, name, sub };
          dispatch({ type: Types.login, payload: { user } });
          dispatch({ type: Types.loading, payload: { loading: false } });
        });
      }
    );
  };

  const logout = async () => {
    webAuth.logout({
      clientID: auth0Config.clientId,
      returnTo: window.location.origin
    });
    handleToken('', 'delete');
    dispatch({ type: Types.logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'auth0',
        user: {
          id: state?.user?.sub,
          email: state?.user?.email,
          displayName: state?.user?.name,
          photoURL: boringAvatarGenerator(state?.user?.name, 'marble'),
          role: 'admin'
        },
        login,
        logout,
      }}
    >
      {state.isInitialized ? children : (
        <Stack alignItems="center" justifyContent="center" width="100%" height="100%" gap={2}>
          <Logo disabledLink />
          <CircularProgress size={24} />
        </Stack>
      )}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.node };

export { AuthContext, AuthProvider };
