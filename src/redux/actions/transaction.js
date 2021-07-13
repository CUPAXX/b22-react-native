import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const getHistory = token => {
  return async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/private/transaction`,
      );
      dispatch({
        type: 'GET_HISTORY',
        payload: data.results,
      });
    } catch (err) {
      dispatch({
        type: 'GET_HISTORY_FAILED',
        payload: err.response.data.message,
      });
    }
  };
};

export const createTransaction = (data, token, payment_method) => {
  return async dispatch => {
    const form = new URLSearchParams();
    data.forEach(item => {
      form.append('item_id', item.id);
      form.append('item_amount', item.amount);
    });
    form.append('payment_method', payment_method);
    try {
      const {data: axios} = await http(token).post(
        `${REACT_APP_BASE_URL}/private/transaction`,
        form.toString(),
      );
      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: axios.message,
      });
    } catch (err) {
      dispatch({
        type: 'CREATE_TRANSACTION_FAILED',
        payload: err.response.data.message,
      });
    }
  };
};
