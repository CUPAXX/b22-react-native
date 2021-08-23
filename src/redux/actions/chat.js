import {http} from '../../helpers/http';
// const {REACT_APP_BACKEND_URL: URL} = process.env;
import {REACT_APP_BASE_URL} from '@env';

export const chatList = token => {
  return async dispatch => {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/private/chat`);
    dispatch({
      type: 'CHAT_LIST_USER',
      payload: data.results,
    });
  };
};

export const chatAll = (phoneNumber, token) => {
  return async dispatch => {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/private/chat/all?user=${phoneNumber}`,
    );
    dispatch({
      type: 'CHAT_GET_ALL',
      payload: data.results,
    });
  };
};

export const sendChat = (recipient, message, token) => {
  console.log(recipient);
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('recipient', recipient);
    form.append('message', message);
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/private/chat`,
        form.toString(),
      );
      dispatch({
        type: 'CHAT_SEND',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'CHAT_SEND_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'CHAT_RESET'});
      }, 3000);
    }
  };
};

export const searchUser = (column, search, token) => {
  return async dispatch => {
    try {
      const {data} = await http(token).get(
        `${REACT_APP_BASE_URL}/private/chat/search?column=${column}&search=${search}`,
      );
      dispatch({
        type: 'USER_SEARCH',
        payload: data.results,
      });
    } catch (err) {
      dispatch({
        type: 'USER_SEARCH_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'CHAT_RESET'});
      }, 3000);
    }
  };
};

export const uploadFile = (recipient, picture, token) => {
  return async dispatch => {
    console.log(picture);
    const form = new FormData();
    form.append('recipient', recipient);
    form.append('picture', {
      uri: picture,
      name: 'test.jpg',
      type: 'image/jpeg',
    });
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/private/chat/upload`,
        form,
      );
      dispatch({
        type: 'UPLOAD_SEND',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'UPLOAD_SEND_FAILED',
        payload: err.response.message,
      });
    }
  };
};

export const deleteChat = (recipient, id, token) => {
  return async dispatch => {
    const form = new URLSearchParams();
    form.append('recipient', recipient);
    const {data} = await http(token).delete(
      `${REACT_APP_BASE_URL}/private/chat/${id}`,
      {
        data: form,
      },
    );
    dispatch({
      type: 'CHAT_DELETE',
      payload: data.message,
    });

    // const {data: axios} = await http(token).get(
    //   `${REACT_APP_BASE_URL}/private/chat`,
    // );
    // dispatch({
    //   type: 'CHAT_LIST_USER',
    //   payload: axios.results,
    // });

    // const {data: axios2} = await http(token).get(
    //   `${REACT_APP_BASE_URL}/private/chat/all?user=${recipient}`,
    // );
    // dispatch({
    //   type: 'CHAT_GET_ALL',
    //   payload: axios2.results,
    // });
  };
};
