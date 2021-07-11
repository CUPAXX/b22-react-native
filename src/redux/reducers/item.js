const initialState = {
  data: [],
  detail: {},
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_GET': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'ITEM_GET_DETAIL': {
      return {
        ...state,
        detail: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default item;
