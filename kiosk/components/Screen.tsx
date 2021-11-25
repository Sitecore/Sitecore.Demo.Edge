import { ReactChildren, ReactChild } from 'react';

interface ScreenProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

const Screen = (props: ScreenProps): JSX.Element => {
  return (
    <div className="temp-wrapper temp-wrapper--wider">
      <div className="px px--ls">
        <div className="px__body"></div>
        <div className="px__screen">
          <div className="px__screen__">
            <div className="px__screen__frame">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;
