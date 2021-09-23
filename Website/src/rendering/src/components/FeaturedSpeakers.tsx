import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Speaker = {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
    Picture: ImageField;
    Featured: Field<boolean>;
  };
};

type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    items: Speaker[];
  };
  params: {
    NumberOfSpeakers: string;
  };
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => (
  <div className="item-grid">
    <div className="grid-content">
      {props.fields.items}
      {props.fields.items &&
        props.fields.items
          .filter((item) => item.fields.Featured.value === true)
          .sort()
          .slice(0, parseInt(props.params.NumberOfSpeakers))
          .map((speaker, index) => (
            <Link
              key={index}
              href={'/speakers/' + speaker.fields.Name.value.replace(/ /g, '')}
              passHref
            >
              <a className="grid-item">
                <Image
                  field={speaker.fields.Picture}
                  alt={speaker.fields.Name?.value}
                  width={265}
                  height={265}
                />
                <div className="item-details">
                  <Text tag="p" field={speaker.fields.Name}></Text>
                </div>
              </a>
            </Link>
          ))}
    </div>
  </div>
);

export type { Speaker };
export type { FeaturedSpeakersProps };
export default FeaturedSpeakers;
