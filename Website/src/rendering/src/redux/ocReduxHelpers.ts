import { AsyncThunk, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { isOrderCloudError } from '../helpers/TypeGuards';
import logout from './ocAuth/logout';
import { logError } from './ocErrors';
import { RootState, AppThunkApi } from './store';
import { get } from 'lodash';

export interface OcThrottle {
  location: keyof RootState;
  property: string;
}

export function createOcAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, AppThunkApi>,
  throttle?: OcThrottle
): AsyncThunk<Returned, ThunkArg, AppThunkApi> {
  return createAsyncThunk<Returned, ThunkArg, AppThunkApi>(
    typePrefix,
    async (args, thunkAPI) => {
      try {
        return await payloadCreator(args, thunkAPI);
      } catch (err) {
        if (isOrderCloudError(err)) {
          switch (err.status) {
            case 401:
              thunkAPI.dispatch(logout());
              break;
            default:
              thunkAPI.dispatch(logError(err));
              break;
          }
        }
        throw err;
      }
    },
    {
      condition: (_, api) => {
        if (throttle) {
          const state = api.getState()[throttle.location];
          const isThrottled = get(state, throttle.property);
          if (typeof isThrottled === 'boolean' && isThrottled) {
            return false;
          }
        }
        return true;
      },
    }
  );
}
