import React, { PropsWithChildren, useState, useContext } from 'react';

export type FeatureFlagState = {
  isPreviewApiEnabled: boolean;
};

// eslint-disable-next-line no-unused-vars
export type SetFeatureFlagFunction = (isPreviewApiEnabled: boolean) => void;

export type FeatureFlagContextValue = {
  featureFlags: FeatureFlagState;
  setFeatureFlag: SetFeatureFlagFunction;
};

export const featureFlagDefaultValue = {
  isPreviewApiEnabled: false,
};

const defaultValue: FeatureFlagContextValue = {
  featureFlags: featureFlagDefaultValue,
  setFeatureFlag: () => {
    // Do nothing for the default context value
  },
};

export const FeatureFlagContext = React.createContext(defaultValue);

export const FeatureFlagContextProvider = (props: PropsWithChildren<unknown>): JSX.Element => {
  const [featureFlagState, setFeatureFlagState] = useState(featureFlagDefaultValue);

  const featureFlagContextValue: FeatureFlagContextValue = {
    featureFlags: featureFlagState,
    setFeatureFlag: (isPreviewApiEnabled: boolean) => {
      setFeatureFlagState({
        isPreviewApiEnabled,
      });
    },
  };

  return (
    <FeatureFlagContext.Provider value={featureFlagContextValue}>
      {props.children}
    </FeatureFlagContext.Provider>
  );
};
