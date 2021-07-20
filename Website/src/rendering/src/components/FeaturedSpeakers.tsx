import Link from 'next/link';
import Image from 'next/image';

import speaker1 from '../../data/media/img/speakers/mary-asada.jpeg';
import speaker2 from '../../data/media/img/speakers/martin-moore.jpeg';
import speaker3 from '../../data/media/img/speakers/ed-jones.jpeg';
import speaker4 from '../../data/media/img/speakers/sophia-taylor.jpeg';
import speaker5 from '../../data/media/img/speakers/li-xiu-ying.jpeg';

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  console.log(props.fields.Speakers);
  console.log(props.fields.Speakers[0]);
  console.log(props.fields.Speakers[0].name);
  console.log(props.fields.Speakers[0]);
  console.log(props.fields.Speakers[0]);
  console.log(props.fields.Speakers[0]);
  console.log(props.fields.Speakers[0]);
  console.log(props.fields.Speakers[0]);
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
            props.fields.Speakers.map((speaker, index) => (
              <Link key={index} href="/speakers/mary-asada" passHref>
                <div className="rounded overflow-hidden">
                  <Image src={speaker1} alt="Speaker" width={265} height={265} />
                  <div className="px-6 py-4">
                    <Text
                      className="text-gray-700 text-base text-center"
                      tag="p"
                      field={speaker?.fields?.name}
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpeakers;
