import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type Speaker = {
  name: string;
  picture: { jsonValue: { value: { src: string } } };
  featured: Field<boolean>;
  role: Field<string>;
};

type SpeakersGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: Speaker[];
        };
      };
    };
  };
};

const SpeakersGrid = (props: SpeakersGridProps): JSX.Element => (
  <div className="section__speakers__grid container">
    {props.fields.data.item.children.results &&
      props.fields.data.item.children.results.map((speaker, index) => (
        <Link key={index} href={'/speakers/' + speaker.name} passHref>
          <a className="section__speakers__grid__speaker">
            <Image
              className="speaker__image"
              field={speaker.picture.jsonValue}
              alt={speaker.name}
            />
            <p className="speaker__name">{speaker.name}</p>
            <Text className="speaker__role" tag="p" field={speaker.role}></Text>
            {speaker.featured?.value && (
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
