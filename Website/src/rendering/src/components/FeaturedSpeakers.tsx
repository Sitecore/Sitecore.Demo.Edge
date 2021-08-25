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
  <section className="">
    <div className="max-w-screen-2xl mx-auto box-border overflow-hidden">
      <Text
        tag="h1"
        className="text-center uppercase text-blue pt-10 text-3xl md:text-4xl font-semibold"
        field={props.fields.Title}
      />
      <Text tag="p" className="text-center" field={props.fields.Subtitle} />
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {props.fields.Speakers &&
          props.fields.Speakers.map((speaker, index) => (
            <Link
              key={index}
              href={'/speakers/' + speaker.fields.Name.value.replace(/ /g, '')}
              passHref
            >
              <a className="section__speakers__grid__speaker">
                <Image
                  field={speaker.fields.Picture}
                  alt={speaker.fields.Name?.value}
                  width={265}
                  height={265}
                />
                <div className="px-6 py-4">
                  <Text
                    className="text-gray-700 text-base text-center"
                    tag="p"
                    field={speaker.fields.Name}
                  ></Text>
                  <Text className="speaker__role" tag="p" field={speaker.fields.Role}></Text>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  </section>
);

export type { Speaker };
export type { FeaturedSpeakersProps };
export default FeaturedSpeakers;
