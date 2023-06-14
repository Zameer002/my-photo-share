import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT } from '../actionTypes';

export const login = (username,password) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        axios.post('https://dummyjson.com/auth/login', {username,password})
          .then((response) => {
            const user = response.data;
            dispatch(loginSuccess(user));
            resolve(); // Resolve the promise after successful login
          })
          .catch((error) => {
            console.log(error);
            reject(error); // Reject the promise if there's an error during login
          });
      });
    };
  };
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};