import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { faCalendar, faClock, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { GetSessionTime } from 'src/helpers/DateHelper';

type Speaker = {
  fields: {
    Name: Field<string>;
    Picture: ImageField;
    JobTitle: Field<string>;
    Company: Field<string>;
    Location: Field<string>;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
};

type Room = {
  fields: {
    Name: Field<string>;
  };
};

type Timeslot = {
  fields: {
    Name: Field<string>;
  };
};

export type SessionInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Description: Field<string>;
    Type: Field<string>;
    Image: ImageField;
    Speakers: Speaker[];
    Rooms: Room[];
    Day: Field<string>;
    Timeslots: Timeslot[];
    Premium: Field<boolean>;
  };
};

const SessionInformation = (props: SessionInformationProps): JSX.Element => {
  console.log(props.fields);

  const speakerHeader = !props.fields.Speakers
    ? ''
    : props.fields.Speakers.length == 1
    ? 'Speaker'
    : 'Speakers';

  return (
    <section className="section information-section speaker-information">
      <div className="section__content left__content">
        <div className="information-grid">
          <div className="image-col">
            <Image field={props.fields?.Image} alt={props.fields?.Name?.value} />

            {props.fields.Rooms && props.fields.Rooms.length > 0 && (
              <div className="bg-gray-light p-2 flex align-middle content-center">
                <span>
                  <FontAwesomeIcon className="icon h-4 mr-2 inline text-black" icon={faDoorOpen} />
                </span>
                <Text
                  className="align-middle content-center"
                  tag="p"
                  field={props.fields.Rooms[0].fields.Name}
                ></Text>
              </div>
            )}

            {props.fields.Day && (
              <div className="bg-gray-light p-2 flex align-middle content-center">
                <span>
                  <FontAwesomeIcon className="icon h-4 mr-2 inline text-black" icon={faCalendar} />
                </span>
                <Text
                  className="align-middle content-center"
                  tag="p"
                  field={props.fields.Day}
                ></Text>
              </div>
            )}

            {props.fields.Timeslots && props.fields.Timeslots.length > 0 && (
              <div className="bg-gray-light p-2 flex align-middle content-center">
                <span>
                  <FontAwesomeIcon className="icon h-4 mr-2 inline text-black" icon={faClock} />
                </span>
                <span className="align-middle content-center">
                  {GetSessionTime(props.fields.Timeslots)}
                </span>
              </div>
            )}

            <div className="hidden md:block pt-4" title="TODO: hardcoded for now...">
              <div className="font-bold">Related Sessions</div>
              <div className="border border-gray p-5 my-5">
                <p>Mon, 19th | 9:00 AM</p>
                <p className="font-bold">10 Tips to get the most out of your routines</p>
              </div>
            </div>
          </div>
          <div className="description-col">
            <div>
              <Text tag="span" className="eyebrow" field={props.fields.Type}></Text>
              {props.fields.Premium?.value === true && <span className="eyebrow">Premium</span>}
            </div>
            <div>
              <Text
                tag="h2"
                className="text-2xl md:text-3xl font-extrabold text-blue"
                field={props.fields.Name}
              ></Text>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="font-bold col-span-1 lg:col-span-2">{speakerHeader}</div>
              {props.fields.Speakers &&
                props.fields.Speakers.map((speaker, index) => (
                  <div key={index} className="pb-4 col-span-1 w-100">
                    <Image
                      className="float-left pr-5"
                      field={speaker.fields?.Picture}
                      alt={speaker.fields?.Name?.value}
                      width={200}
                      height={200}
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
                    {speaker.fields.JobTitle && (
                      <span>
                        <span className="font-bold">Position: </span>
                        <Text field={speaker.fields.JobTitle}></Text>
                      </span>
                    )}
                    {speaker.fields.Company && (
                      <span className="block">
                        <span className="font-bold">Company: </span>
                        <Text field={speaker.fields.Company}></Text>
                      </span>
                    )}
                    {speaker.fields.Location && (
                      <span className="block">
                        <span className="font-bold">Country: </span>
                        <Text field={speaker.fields.Location}></Text>
                      </span>
                    )}
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

export type { Speaker };
export default SessionInformation;
