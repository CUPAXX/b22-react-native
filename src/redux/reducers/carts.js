const initialState = {
  items: [],
  totalItem: 0,
};

const carts = (state = initialState, action) => {
  switch (action.type) {
    case 'CARTS_ADD_ITEM': {
      return {
        ...state,
        items: [...state.items, ...[action.payload]],
      };
    }
    case 'CARTS_DELETE_ITEMS': {
      const items = [...state.items];
      const removed = items.splice(action.payload, 1);
      return {
        ...state,
        items,
      };
    }
    case 'CARTS_DELETE_ALL_ITEMS': {
      return {
        ...state,
        items: action.payload,
      };
    }
    case 'SET_CARTS_ITEM': {
      return {
        ...state,
        items: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default carts;
