import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const getItem = () => {
  return async dispatch => {
    try {
      const {data} = await http().get(`${REACT_APP_BASE_URL}/item`);
      dispatch({
        type: 'ITEM_GET',
        payload: data.results,
      });
    } catch (err) {
      console.log('Get item failed' + err);
      throw err;
    }
  };
};

export const getDetail = id => {
  return async dispatch => {
    try {
      const {data} = await http().get(`${REACT_APP_BASE_URL}/item/${id}`);
      dispatch({
        type: 'ITEM_GET_DETAIL',
        payload: data.results,
      });
    } catch (err) {
      console.log('Get detail item failed' + err);
      throw err;
    }
  };
};
