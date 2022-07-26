import Link from 'next/link';
import { Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';

export type SpeakersGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: GraphQLSpeaker[];
        };
      };
    };
  };
};

const SpeakersGrid = (props: SpeakersGridProps): JSX.Element => {
  const speakers =
    props.fields.data?.item?.children?.results &&
    props.fields.data.item.children.results
      .filter((item) => !item.featured.value)
      .map((speaker, index) => (
        <Link key={index} href={speaker.url.path} passHref>
          <a className="speakers-grid-speaker">
            <div className="speaker-image">
              <Image
                field={speaker.picture.jsonValue}
                alt={speaker.name.value}
                width={265}
                height={265}
              />
            </div>
            <Text className="speaker-name" tag="p" field={speaker.name} />
            <Text tag="p" field={speaker.jobTitle} />
          </a>
        </Link>
      ));

  return <div className="speakers-grid container">{speakers}</div>;
};

export default SpeakersGrid;
