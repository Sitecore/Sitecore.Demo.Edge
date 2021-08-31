import Link from 'next/link';
import { Text, Field, ImageField, Image, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Speaker = {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
  };
};

type Session = {
  name: Field<string>;
  fields: {
    Name: Field<string>;
    Image: ImageField;
    Date: Field<string>;
    Duration: Field<string>;
    Speakers: Speaker[];
  };
};

type SessionsGridProps = ComponentProps & {
  fields: {
    items: Session[];
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => (
  <div className="item-grid sessions-grid">
    <div className="grid-content">
      {props.fields.items &&
        props.fields.items.map((session, index) => (
          <Link key={index} href={'/sessions/' + session.name} passHref>
            <a className="grid-item">
              <div className="image-hover-zoom">
                <Image field={session.fields.Image} alt={session.fields.Name.value} />
              </div>
              <div className="item-details item-details-left">
                <Text tag="div" className="item-title" field={session.fields.Name}></Text>
                <DateField
                  tag="p"
                  field={session.fields.Date}
                  render={(date) =>
                    date?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                />
                <p>
                  <span>Start Time: </span>
                  <DateField
                    tag="span"
                    field={session.fields.Date}
                    render={(date) =>
                      date?.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }
                  />
                </p>
                <p>
                  <span>Duration: {session.fields.Duration?.value?.replace('_', '.')}</span>
                </p>
                {session.fields.Speakers &&
                  session.fields.Speakers.map((speaker, index) => (
                    <p key={index}>
                      <Text tag="span" className="speaker-name" field={speaker.fields.Name}></Text>
                      {' | '}
                      <Text tag="span" field={speaker.fields.Role}></Text>
                    </p>
                  ))}
              </div>
            </a>
          </Link>
        ))}
    </div>
  </div>
);

export type { Session, Speaker };
export default SessionsGrid;
