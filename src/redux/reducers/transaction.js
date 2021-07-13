const initialState = {
  data: [],
  sccMsg: '',
  errMsg: '',
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'GET_HISTORY_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'CREATE_TRANSACTION': {
      return {
        ...state,
        sccMsg: action.payload,
        errMsg: '',
      };
    }
    case 'CREATE_TRANSACTION_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
        sccMsg: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transaction;
