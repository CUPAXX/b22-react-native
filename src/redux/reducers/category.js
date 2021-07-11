const initialState = {
  data: [],
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY': {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default category;
