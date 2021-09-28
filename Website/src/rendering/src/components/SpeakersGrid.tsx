import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type Speaker = {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
    Picture: ImageField;
    Featured: Field<boolean>;
  };
};

type SpeakersGridProps = ComponentProps & {
  fields: {
    items: Speaker[];
  };
};

const SpeakersGrid = (props: SpeakersGridProps): JSX.Element => (
  <div className="section__speakers__grid container">
    {props.fields.items &&
      props.fields.items.map((speaker, index) => (
        <Link key={index} href={'/speakers/' + speaker.fields.Name.value} passHref>
          <a className="section__speakers__grid__speaker">
            <Image
              className="speaker__image"
              field={speaker.fields.Picture}
              alt={speaker.fields.Name.value}
            />
            <Text className="speaker__name" tag="p" field={speaker.fields.Name}></Text>
            <Text className="speaker__role" tag="p" field={speaker.fields.Role}></Text>
            {speaker.fields.Featured?.value && (
              <div className="speaker__featured" title="Featured">
                <FontAwesomeIcon className="icon" icon={faStar} />
              </div>
            )}
          </a>
        </Link>
      ))}
  </div>
);

export type { Speaker };
export type { SpeakersGridProps };
export default SpeakersGrid;
