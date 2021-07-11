const initialState = {
  data: [],
};

const cateItem = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_GET_CATEGORY': {
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

export default cateItem;
