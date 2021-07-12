import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

// const {REACT_APP_BASE_URL: URL} = require('@env');

export const authLogin = (email, password) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('email', email);
    form.append('password', password);

    try {
      const {data} = await http().post(
        `${REACT_APP_BASE_URL}/auth/login`,
        form.toString(),
      );

      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.results.token,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'AUTH_RESET'});
      }, 3000);
    }
  };
};

export const authRegister = (email, password, phoneNumber) => {
  return async dispatch => {
    const form2 = new URLSearchParams();
    form2.append('email', email);
    form2.append('password', password);
    form2.append('phoneNumber', phoneNumber);
    console.log(form2);
    try {
      const {data} = await http().post(
        `${REACT_APP_BASE_URL}/auth/register`,
        form2.toString(),
      );
      dispatch({
        type: 'AUTH_REGISTER',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_REGISTER_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'AUTH_RESET'});
      }, 3000);
    }
  };
};

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});
