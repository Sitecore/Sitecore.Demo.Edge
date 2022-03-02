import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export const MockStore = ({ sliceOrSlices, children }: MockStoreProps): JSX.Element => {
  if (isSingleSlice(sliceOrSlices)) {
    const reducer = {
      [sliceOrSlices.name]: createSlice({
        name: sliceOrSlices.name,
        initialState: sliceOrSlices.state,
        reducers: {
          // We only need a reducer here to satisfy the condition for creating a store
          // since our components won't be functional the actions/reducers don't actually matter
          // only the initial state received from the store
          mockReducer: () => null,
        },
      }).reducer,
    };
    return <Provider store={configureStore({ reducer })}>{children}</Provider>;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reducer = sliceOrSlices.reduce((slicesMap: any, sliceDefinition) => {
      slicesMap[sliceDefinition.name] = createSlice({
        name: sliceDefinition.name,
        initialState: sliceDefinition.state,
        reducers: {
          // We only need a reducer here to satisfy the condition for creating a store
          // since our components won't be functional the actions/reducers don't actually matter
          // only the initial state received from the store
          mockReducer: () => null,
        },
      }).reducer;
      return slicesMap;
    }, {});
    return <Provider store={configureStore({ reducer })}>{children}</Provider>;
  }
};

function isSingleSlice(sliceOrSlices: MockSlice | MockSlice[]): sliceOrSlices is MockSlice {
  return (sliceOrSlices as MockSlice[]).length === undefined;
}

export interface MockStoreProps {
  sliceOrSlices: MockSlice | MockSlice[];
  children: JSX.Element;
}

export interface MockSlice {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
}
