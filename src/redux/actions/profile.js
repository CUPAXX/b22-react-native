import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const profileUser = token => {
  return async dispatch => {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/private/profile`,
    );
    dispatch({
      type: 'PROFILE_GET',
      payload: data.results,
    });
  };
};

export const updateProfile = (
  {userName, email, phoneNumber, firstName, lastName, address, picture},
  token,
) => {
  return async dispatch => {
    const form = new FormData();
    form.append('userName', userName);
    form.append('email', email);
    form.append('phoneNumber', phoneNumber);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('address', address);
    form.append('picture', {
      uri: picture,
      name: 'test.jpg',
      type: 'image/jpeg',
    });
    console.log('test');

    try {
      const {data} = await http(token).patch(
        `${REACT_APP_BASE_URL}/private/profile`,
        form,
      );
      console.log('test');
      dispatch({
        type: 'PROFILE_UPDATE',
        payload: data.results,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_UPDATE_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'PROFILE_RESET'});
      }, 3000);
    }
  };
};
