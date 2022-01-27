import Link from 'next/link';
import { Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';

export type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: GraphQLSpeaker[];
        };
      };
    };
  };
  params: {
    NumberOfSpeakers: string;
  };
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => {
  const speakers =
    props.fields.data?.item?.children?.results &&
    props.fields.data.item.children.results
      .filter((item) => item.featured.value)
      .sort()
      .slice(0, parseInt(props.params.NumberOfSpeakers))
      .map((speaker, index) => (
        <Link key={index} href={`/speakers/${speaker.name.value}`} passHref>
          <a className="grid-item">
            <Image
              field={speaker.picture.jsonValue}
              alt={speaker.name}
              width={265}
              height={265}
              loading="lazy"
            />
            <div className="item-details">
              <Text tag="p" field={speaker.name} />
            </div>
          </a>
        </Link>
      ));

  return (
    <div className="item-grid">
      <div className="grid-content">{speakers}</div>
    </div>
  );
};

export default FeaturedSpeakers;
