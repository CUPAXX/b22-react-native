const initialState = {
  data: {},
  errMsg: '',
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_GET': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'PROFILE_UPDATE': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'PROFILE_UPDATE_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'PROFILE_RESET': {
      return {
        ...state,
        errMsg: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default profile;
