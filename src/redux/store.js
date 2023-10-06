import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './slices/user.slice';
import authReducer from './slices/auth.slice';

const RootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: RootReducer,
});

const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
