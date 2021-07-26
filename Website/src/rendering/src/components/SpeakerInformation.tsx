import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type SpeakerInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
    Image: ImageField;
    Position: Field<string>;
    Company: Field<string>;
    Country: Field<string>;
    Description: Field<string>;
    FacebookProfileLink: Field<string>;
    TwitterProfileLink: Field<string>;
    InstagramProfileLink: Field<string>;
    LinkedinProfileLink: Field<string>;
  };
};

const SpeakerInformation = (props: SpeakerInformationProps): JSX.Element => (
  <section className="section">
    <div className="section__content left__content">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1">
          <Image field={props.fields?.Image} alt={props.fields?.Name?.value} />
          <div>
            {/* TODO: To be turned into links */}
            <a href={props.fields.FacebookProfileLink?.value}>
              <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faFacebookF} />
            </a>
            <a href={props.fields.TwitterProfileLink?.value}>
              <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faTwitter} />
            </a>
            <a href={props.fields.LinkedinProfileLink?.value}>
              <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faLinkedinIn} />
            </a>
            <a href={props.fields.InstagramProfileLink?.value}>
              <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faInstagram} />
            </a>
          </div>
          <div className="pt-5">
            <strong>Position:</strong> {props.fields.Position.value}
          </div>
          <div className="pt-5">
            <strong>Company:</strong> {props.fields.Company.value}
          </div>
          <div className="pt-5">
            <strong>Country:</strong> {props.fields.Country.value}
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 space-y-5">
          {/* TODO: Add speaker type in content hub */}
          <Text tag="h3" className="uppercase" field={props.fields.Role}></Text>
          <Text
            tag="h2"
            className="text-2xl md:text-3xl font-extrabold text-blue"
            field={props.fields.Name}
          ></Text>
          <RichText field={props.fields.Description} />
          {/* TODO: Link sessions with speakers and show info here */}
          <div>
            <div>
              <strong>Talks</strong>
            </div>
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

export default SpeakerInformation;
