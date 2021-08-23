import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import {
  Field,
  ImageField,
  Image,
  RichText,
  Text,
  DateField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type Speaker = {
  fields: {
    Name: Field<string>;
    Picture: ImageField;
    Position: Field<string>;
    Company: Field<string>;
    Country: Field<string>;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
};

export type SessionInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Description: Field<string>;
    Date: Field<string>;
    Image: ImageField;
    Duration: Field<string>;
    Speakers: Speaker[];
  };
};

const SessionInformation = (props: SessionInformationProps): JSX.Element => {
  const speakerHeader = !props.fields.Speakers
    ? ''
    : props.fields.Speakers.length == 1
    ? 'Speaker'
    : 'Speakers';
  return (
    <section className="section">
      <div className="section__content left__content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Image field={props.fields?.Image} alt={props.fields?.Name?.value} />
            <p>
              <DateField
                tag="h3"
                // className="inline"
                field={props.fields.Date}
                render={(date) =>
                  'Date: ' +
                  date?.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }
              />
              {/* <span className="spacer p-2">|</span> */}
              <DateField
                tag="span"
                field={props.fields.Date}
                render={(date) =>
                  'Time: ' +
                  date?.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }
              />
              {/* <span className="spacer p-2">|</span> */}
              <span className="block">
                Duration:&nbsp;
                <Text tag="h3" className="inline uppercase" field={props.fields.Duration}></Text>
              </span>
            </p>

            <div className="hidden md:block pt-4" title="TODO: hardcoded for now...">
              <div className="font-bold">Related Sessions</div>
              <div className="border border-gray p-5 my-5">
                <p>Mon, 19th | 9:00 AM</p>
                <p className="font-bold">10 Tips to get the most out of your routines</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 space-y-5">
            {/* TODO: Map tags below */}
            <span className="btn--main bg-yellow">Keynote</span>
            <Text
              tag="h2"
              className="text-2xl md:text-3xl font-extrabold text-blue"
              field={props.fields.Name}
            ></Text>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="font-bold col-span-1 lg:col-span-2">{speakerHeader}</div>
              {props.fields.Speakers &&
                props.fields.Speakers.map((speaker, index) => (
                  <div key={index} className="pb-4 col-span-1 w-100">
                    <Image
                      className="float-left pr-5"
                      field={speaker.fields?.Picture}
                      alt={speaker.fields?.Name?.value}
                    />
                    <div>
                      <Text
                        tag="h3"
                        className="md:text-xl font-bold text-blue"
                        field={speaker.fields.Name}
                      ></Text>
                      {/* TODO: To be turned into links */}
                      {!speaker.fields.FacebookProfileLink ? (
                        ''
                      ) : (
                        <a href={speaker.fields.FacebookProfileLink.value}>
                          <FontAwesomeIcon
                            className="icon h-4 m-2 inline text-blue"
                            icon={faFacebookF}
                          />
                        </a>
                      )}
                      {!speaker.fields.TwitterProfileLink ? (
                        ''
                      ) : (
                        <a href={speaker.fields.TwitterProfileLink.value}>
                          <FontAwesomeIcon
                            className="icon h-4 m-2 inline text-blue"
                            icon={faTwitter}
                          />
                        </a>
                      )}
                      {!speaker.fields.LinkedinProfileLink ? (
                        ''
                      ) : (
                        <a href={speaker.fields.LinkedinProfileLink.value}>
                          <FontAwesomeIcon
                            className="icon h-4 m-2 inline text-blue"
                            icon={faLinkedinIn}
                          />
                        </a>
                      )}
                      {!speaker.fields.InstagramProfileLink ? (
                        ''
                      ) : (
                        <a href={speaker.fields.InstagramProfileLink.value}>
                          <FontAwesomeIcon
                            className="icon h-4 m-2 inline text-blue"
                            icon={faInstagram}
                          />
                        </a>
                      )}
                    </div>
                    <span>
                      <span className="font-bold">Position: </span>
                      <Text field={speaker.fields.Position}></Text>
                    </span>
                    <span className="block">
                      <span className="font-bold">Company: </span>
                      <Text field={speaker.fields.Company}></Text>
                    </span>
                    <span className="block">
                      <span className="font-bold">Country: </span>
                      <Text field={speaker.fields.Country}></Text>
                    </span>
                  </div>
                ))}
            </div>
            <RichText field={props.fields.Description} />

            <div className="block md:hidden" title="TODO: hardcoded for now...">
              <div className="font-bold">Related Sessions</div>
              <div className="border border-gray p-5 my-5">
                <p>Mon, 19th | 9:00 AM</p>
                <p className="font-bold">10 Tips to get the most out of your routines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionInformation;
