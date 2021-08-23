const initialState = {
  data: [],
  allData: [],
  userData: [],
  sccMsg: '',
  errMsg: '',
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'CHAT_LIST_USER': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'CHAT_GET_ALL': {
      return {
        ...state,
        allData: action.payload,
      };
    }
    case 'USER_SEARCH': {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case 'USER_SEARCH_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'CHAT_SEND': {
      return {
        ...state,
        sccMsg: action.payload,
        errMsg: '',
      };
    }
    case 'UPLOAD_SEND': {
      return {
        ...state,
        sccMsg: action.payload,
        errMsg: '',
      };
    }
    case 'CHAT_SEND_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
        sccMsg: '',
      };
    }
    case 'CHAT_RESET': {
      return {
        ...state,
        sccMsg: '',
        errMsg: '',
        userData: [],
      };
    }
    case 'CHAT_ROOM_CLEAR': {
      return {
        ...state,
        allData: [],
      };
    }
    case 'CHAT_DELETE': {
      return {
        ...state,
        sccMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default chat;
