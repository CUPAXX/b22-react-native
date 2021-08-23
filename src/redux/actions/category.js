import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const getCategory = () => {
  return async dispatch => {
    const {data} = await http().get(`${REACT_APP_BASE_URL}/category`);
    console.log('test');
    dispatch({
      type: 'GET_CATEGORY',
      payload: data.results,
    });
  };
};
