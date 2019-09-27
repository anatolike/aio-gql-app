import React from "react";

import {useMutation} from '@apollo/react-hooks';

import AuthProvider from "./AuthProvider";
import {getAuthToken, removeAuthToken, setAuthToken} from "./utils";
import useNotifier from "../components/Messages/hooks";
import useNavigator from "../hooks/useNavigator";
import {authTokenMutation,
  registerUserMutation,
  verifyTokenMutation} from "./mutations";



const initialState = {
  loading: true,
  user: null,
  errors: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {...state, user: action.user}
    case 'setErrors':
      return {...state, errors: action.errors}
    case 'setLoading':
      return {...state, loading: action.loading}
    default:
      return {...state }
  }
}



const AuthProviderContainer = ({children}) => {
  const navigate = useNavigator();
  const pushMessage = useNotifier();
  const [state, dispatch] = React.useReducer(reducer, initialState)


  const handleVerify = (data) => {
    const {verifyToken} = data;
    if (verifyToken.ok) {
      dispatch({type: 'setUser', user: verifyToken.user})
      dispatch({type: 'setLoading', loading: false})
    } else {
      logout();
    }
  };


  const handleRegistration = (data) => {
    const {registerUser} = data;
    dispatch({type: 'setLoading', loading: false})

    if (registerUser.ok) {
      setAuthToken(registerUser.token);
      dispatch({type: 'setUser', user: registerUser.user})
      navigate('/cabinet')
    } else {
      dispatch({type: 'setErrors', errors: registerUser.errors})
    }
  };


  const handleAuth = (data) => {
    const {authToken} = data;

    if (authToken.ok) {
      setAuthToken(authToken.token);
      dispatch({type: 'setUser', user: authToken.user})
      dispatch({type: 'setLoading', loading: false})
      navigate('/cabinet')

    } else {
      const authErrorMsg = (
        <span>
          Can not find user
        </span>
      );
      pushMessage({text: authErrorMsg});
    }
  };


  const [verifyToken] = useMutation(
    verifyTokenMutation,
    {onCompleted: handleVerify}

  );


  const [registerUser] = useMutation(
    registerUserMutation,
    {onCompleted: handleRegistration}
  );


  const [authToken] = useMutation(
    authTokenMutation,
    {onCompleted: handleAuth}
  );


  const login = (email, password) => {
    return authToken({variables: {email, password}})
  };


  const verify = () => {
    const token = getAuthToken();
    if (!!token && !state.user) {
      return verifyToken({variables: {token}})
    } else {
      dispatch({type: 'setUser', user: null})
      dispatch({type: 'setLoading', loading: false})
    }
  };


  const register = (firstName, email, password) => {
    dispatch({type: 'setErrors', errors: []})
    return registerUser({variables: {inputData: {firstName, email, password}}})
  };


  const reset = () => {
    removeAuthToken();
    dispatch({type: 'setUser', user: null})
  };


  const logout = () => {
    reset();
    navigate("/")
  };


  return (
    <AuthProvider
      loading={state.loading}
      user={state.user}
      errors={state.errors}
      verify={verify}
      login={login}
      register={register}
      logout={logout}
    >
      {children}
    </AuthProvider>
  );
};


export default AuthProviderContainer
