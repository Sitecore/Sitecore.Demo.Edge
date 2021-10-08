import Link from 'next/link';
import { Text, Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Speaker = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  picture: {
    jsonValue: {
      value: ImageField;
    };
  };
  featured: {
    value: boolean;
  };
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
            <Link key={index} href={`/speakers/${speaker.itemName}`} passHref>
              <a className="grid-item">
                <Image
                  field={speaker.picture.jsonValue}
                  alt={speaker.name}
                  width={265}
                  height={265}
                  loading="lazy"
                />
                <div className="item-details">
                  <Text tag="p" field={speaker.name}></Text>
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
