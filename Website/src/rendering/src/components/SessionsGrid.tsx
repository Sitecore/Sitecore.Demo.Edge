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
  Name: Field<string>;
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

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  console.log(props.fields);
  return (
    <section>
      <div className="session-grid">
        <div className="session-grid-container">
          {props.fields.items &&
            props.fields.items.map((session, index) => (
              <Link key={index} href={'/schedule/' + session.Name} passHref>
                <div className="session-grid-content">
                  <Image
                    field={session.fields.Image}
                    alt={session.fields.Name.value}
                    width={340}
                    height={227}
                  />
                  <div className="px-6 py-4">
                    <Text
                      tag="div"
                      className="font-bold text-base mb-2 h-18 uppercase"
                      field={session.fields.Name}
                    ></Text>
                    <DateField
                      tag="p"
                      className="text-gray-700 text-xs pb-3"
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
                    <p className="text-gray-700 text-xs pb-3">
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
                    <p className="text-gray-700 text-xs pb-3">
                      {/* TODO: change to field */}
                      <span>Duration: {session.fields.Duration?.value?.replace('_', '.')}</span>
                    </p>
                    {session.fields.Speakers &&
                      session.fields.Speakers.map((speaker, index) => (
                        <p key={index}>
                          <Text
                            tag="span"
                            className="text-gray-700 text-xs uppercase"
                            field={speaker.fields.Name}
                          ></Text>
                          {' | '}
                          <Text
                            tag="span"
                            className="text-gray-700 text-xs"
                            field={speaker.fields.Role}
                          ></Text>
                        </p>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export type { Session, Speaker };
export default SessionsGrid;
