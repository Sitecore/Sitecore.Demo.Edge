import { AnyAction, configureStore, createSlice, Reducer } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export interface MockSlice {
  name: string;
  state: unknown;
}

export interface MockStoreProps {
  sliceOrSlices: MockSlice | MockSlice[];
  children: JSX.Element;
}

function isSingleSlice(sliceOrSlices: MockSlice | MockSlice[]): sliceOrSlices is MockSlice {
  return (sliceOrSlices as MockSlice[]).length === undefined;
}

function createMockSlice(sliceDefinition: MockSlice): Reducer<unknown, AnyAction> {
  return createSlice({
    name: sliceDefinition.name,
    initialState: sliceDefinition.state,
    reducers: {
      // We only need a reducer here to satisfy the condition for creating a store
      // since our components won't be functional the actions/reducers don't actually matter
      // only the initial state received from the store
      mockReducer: () => null,
    },
  }).reducer;
}

export const MockStore = ({ sliceOrSlices, children }: MockStoreProps): JSX.Element => {
  let reducer = {};

  if (isSingleSlice(sliceOrSlices)) {
    reducer = {
      [sliceOrSlices.name]: createMockSlice(sliceOrSlices),
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducer = sliceOrSlices.reduce((slicesMap: any, sliceDefinition) => {
      slicesMap[sliceDefinition.name] = createMockSlice(sliceDefinition);
      return slicesMap;
    }, {});
  }

  return <Provider store={configureStore({ reducer })}>{children}</Provider>;
};
