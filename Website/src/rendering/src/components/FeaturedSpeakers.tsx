import Link from 'next/link';

import { Text, Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentListProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Speakers: Item[];
  };
};

const FeaturedSpeakers = (props: ContentListProps): JSX.Element => {
  console.log(props.fields.Speakers.length);
  return (
    <section className="">
      <div className="max-w-screen-2xl mx-auto box-border overflow-hidden bg-white">
        <Text
          tag="h1"
          className="text-center uppercase text-blue pt-10 text-3xl md:text-4xl font-semibold"
          field={props.fields?.Title}
        />
        <Text tag="p" className="text-center" field={props.fields?.Subtitle} />
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {props.fields.Speakers &&
            props.fields.Speakers.map((speaker, index) => {
              console.log(speaker);
              return (
                <Link key={index} href={'/speakers/' + speaker.name.replace(' ', '')} passHref>
                  <div className="rounded overflow-hidden cursor-pointer mx-auto">
                    <img
                      src={speaker?.fields?.Image?.value?.src}
                      alt={speaker?.name}
                      width={265}
                      height={265}
                    />
                    <div className="px-6 py-4">
                      <Text
                        className="text-gray-700 text-base text-center"
                        tag="p"
                        field={speaker?.fields?.name}
                      ></Text>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpeakers;
