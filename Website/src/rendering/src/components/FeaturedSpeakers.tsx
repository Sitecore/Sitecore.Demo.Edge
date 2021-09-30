import Link from 'next/link';
import { Field, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Speaker = {
  name: string;
  picture: {
    jsonValue: {
      value: {
        src: string;
      };
    };
  };
  featured: Field<boolean>;
};

type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: Speaker[];
        };
      };
    };
  };
  params: {
    NumberOfSpeakers: string;
  };
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => (
  <div className="item-grid">
    <div className="grid-content">
      {props.fields.data?.item?.children?.results &&
        props.fields.data.item.children.results
          .filter((item) => item.featured.value)
          .sort()
          .slice(0, parseInt(props.params.NumberOfSpeakers))
          .map((speaker, index) => (
            <Link key={index} href={'/speakers/' + speaker.name} passHref>
              <a className="grid-item">
                <Image
                  field={speaker.picture.jsonValue}
                  alt={speaker.name}
                  width={265}
                  height={265}
                  loading="lazy"
                />
                <div className="item-details">
                  <p>{speaker.name}</p>
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
