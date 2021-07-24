const initialState = {
  data: [],
  detail: {},
  search: [],
  pageInfo: {},
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_GET': {
      return {
        ...state,
        search: action.payload.results,
        pageInfo: action.payload.pageInfo,
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
