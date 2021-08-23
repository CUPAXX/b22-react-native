import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const getItemCategory = id => {
  return async dispatch => {
    const {data} = await http().get(
      `${REACT_APP_BASE_URL}/category/${id}/item`,
    );
    console.log('test');
    dispatch({
      type: 'ITEM_GET_CATEGORY',
      payload: data.results,
    });
  };
};
