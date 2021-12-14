import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { FeatureFlagContext } from '../contexts/FeatureFlagContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Navigation = (): JSX.Element => {
  const featureFlagContext = useContext(FeatureFlagContext);

  function handleApiContextClick(e: React.MouseEvent<HTMLInputElement>) {
    // Set the context with new values
    const button = e.target as HTMLInputElement;
    featureFlagContext.setFeatureFlag(button.checked);
  }

  return (
    <div className="menu">
      <div className="menu-toggle-api">
        <label htmlFor="toggle-button" className="flex items-center cursor-pointer relative mb-4">
          <input
            onClick={handleApiContextClick}
            type="checkbox"
            id="toggle-button"
            className="peer sr-only"
          />
          <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
          <span className="toggle-text ml-3 text-blue-light text-sm font-medium peer-checked:toggle-text"></span>
        </label>
      </div>
      <div className="menu-button refresh-button">
        <FontAwesomeIcon className="icon" icon={faSyncAlt} />
      </div>
    </div>
  );
};

export default Navigation;
