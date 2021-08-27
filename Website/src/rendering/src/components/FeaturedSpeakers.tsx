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

type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Speakers: Speaker[];
  };
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => (
  <section className="section section--bg-white">
    <div className="section__content">
      <Text
        tag="h1"
        className="section__content__title section__content__title--light"
        field={props.fields.Title}
      />
      <Text tag="p" className="section__content__subtitle--center" field={props.fields.Subtitle} />

      <div className="item-grid">
        <div className="grid-content">
          {props.fields.Speakers &&
            props.fields.Speakers.map((speaker, index) => (
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
    </div>
  </section>
);

export type { Speaker };
export type { FeaturedSpeakersProps };
export default FeaturedSpeakers;
