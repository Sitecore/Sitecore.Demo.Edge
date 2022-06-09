import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ocErrors from './ocErrors';
import ocAuth from './ocAuth';
import ocUser from './ocUser';
import ocProductCache from './ocProductCache';
import ocProductList from './ocProductList';
import ocProductDetail from './ocProductDetail';
import ocCurrentCart from './ocCurrentCart';
import ocAddressBook from './ocAddressBook';

const store = configureStore({
  reducer: {
    ocErrors,
    ocAuth,
    ocUser,
    ocAddressBook,
    ocProductCache,
    ocProductList,
    ocProductDetail,
    ocCurrentCart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkApi = {
  dispatch: AppDispatch;
  state: RootState;
};

export const useAppDispatch = (): ThunkDispatch<RootState, null, AnyAction> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
