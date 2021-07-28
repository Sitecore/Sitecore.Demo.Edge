import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Speaker = {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
    Picture: ImageField;
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
        <Link
          key={index}
          href={'/speakers/' + speaker.fields.Name.value.replace(/ /g, '')}
          passHref
        >
          <a className="section__speakers__grid__speaker">
            <Image field={speaker.fields.Picture} alt={speaker.fields.Name.value} />
            <Text className="speaker__name" tag="p" field={speaker.fields.Name}></Text>
            <Text className="speaker__role" tag="p" field={speaker.fields.Role}></Text>
          </a>
        </Link>
      ))}
  </div>
);

export default SpeakersGrid;
