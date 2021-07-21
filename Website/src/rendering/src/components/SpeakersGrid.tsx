import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Speaker = {
  fields: {
    name: Field<string>;
    Image: ImageField;
  };
};

type SpeakersGridProps = ComponentProps & {
  fields: {
    items: Speaker[];
  };
};

const SpeakersGrid = (props: SpeakersGridProps): JSX.Element => {
  console.log(props.fields);

  return (
    <div className="section__speakers__grid">
      {props.fields.items &&
        props.fields.items.map((speaker, index) => {
          return (
            <Link
              key={index}
              href={'/speakers/' + speaker.fields.name.value.replace(' ', '')}
              passHref
            >
              <a className="section__speakers__grid__speaker">
                <Image field={speaker.fields.Image} alt={speaker.fields.name} />
                <Text className="speaker__name" tag="p" field={speaker.fields.name}></Text>
                <p className="speaker__role">Athlete</p>
              </a>
            </Link>
          );
        })}
    </div>
  );
};

export default SpeakersGrid;
