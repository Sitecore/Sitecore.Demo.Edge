import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
    props.fields.data.item.children.results.map((speaker, index) => (
      <Link key={index} href={`/speakers/${speaker.itemName}`} passHref>
        <a className="section__speakers__grid__speaker">
          <Image className="speaker__image" field={speaker.picture.jsonValue} alt={speaker.name} />
          <Text className="speaker__name" tag="p" field={speaker.name} />
          <Text className="speaker__role" tag="p" field={speaker.role} />
          {speaker.featured?.value && (
            <div className="speaker__featured" title="Featured">
              <FontAwesomeIcon className="icon" icon={faStar} />
            </div>
          )}
        </a>
      </Link>
    ));

  return <div className="section__speakers__grid container">{speakers}</div>;
};

export default withDatasourceCheck()<SpeakersGridProps>(SpeakersGrid);
