import {combineReducers} from 'redux';
import carts from './carts';
import item from './item';
import category from './category';
import cateItem from './cateItem';
import auth from './auth';
import profile from './profile';

const reducer = combineReducers({
  auth,
  carts,
  category,
  item,
  cateItem,
  profile,
});

export default reducer;
