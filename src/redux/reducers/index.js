import {combineReducers} from 'redux';
import carts from './carts';
import item from './item';
import category from './category';
import cateItem from './cateItem';
import auth from './auth';
import profile from './profile';
import transaction from './transaction';
import chat from './chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistAuth = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  carts,
  auth: persistReducer(persistAuth, auth),
  category,
  item,
  cateItem,
  profile,
  transaction,
  chat,
});

export default reducer;
