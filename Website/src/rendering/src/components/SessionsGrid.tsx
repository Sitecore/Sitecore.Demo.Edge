import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Timeslot } from '../interfaces/Timeslot';
import SessionItem from './SessionItem';

type Speaker = {
  name: Field<string>;
  role: Field<string>;
};

type Day = {
  name: Field<string>;
};

type Session = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  premium: Field<boolean>;
  image: {
    jsonValue: ImageField;
  };
  speakers: {
    targetItems: Speaker[];
  };
  day: {
    targetItems: Day[];
  };
  timeslots: {
    targetItems: Timeslot[];
  };
};

type SessionsGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: Session[];
        };
      };
    };
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  return (
    <div className="item-grid sessions-grid">
      <div className="grid-content">
        {props.fields.data?.item?.children?.results &&
          props.fields.data.item.children.results.map((session, index) => (
            <SessionItem key={index} session={session} />
          ))}
      </div>
    </div>
  );
};

export type { Session, Speaker };
export default SessionsGrid;
