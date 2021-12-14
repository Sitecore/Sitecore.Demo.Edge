import Link from 'next/link';
import { Text, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
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
        <Link key={index} href={`/speakers/${speaker.itemName}`} passHref>
          <a className="section__speakers__grid__speaker">
            <Image
              className="speaker__image"
              field={speaker.picture.jsonValue}
              alt={speaker.name.value}
            />
            <Text className="speaker__name" tag="p" field={speaker.name} />
            <Text className="speaker__role" tag="p" field={speaker.jobTitle} />
          </a>
        </Link>
      ));

  return (
    <div className="section__speakers container">
      <div className="section__speakers__grid">{speakers}</div>
    </div>
  );
};

export default withDatasourceCheck()<SpeakersGridProps>(SpeakersGrid);