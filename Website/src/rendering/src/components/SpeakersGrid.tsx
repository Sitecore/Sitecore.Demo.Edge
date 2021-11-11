import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
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
    props.fields.data.item.children.results
      .filter((item) => !item.featured.value)
      .map((speaker, index) => (
        <Link key={index} href={`/speakers/${speaker.itemName}`} passHref>
          <a className="section__speakers__grid__speaker">
            {/* <Image className="speaker__image" field={speaker.picture.jsonValue} alt={speaker.name} /> */}
            <img
              className="speaker__image"
              src={
                'https://playsummit.sitecoresandbox.cloud:8443/api/public/content/4deed22efd2a4835b0d624db0ae3792f?v=1b14d29a'
              }
              alt={speaker.name.value}
              width={265}
              height={265}
            />
            <Text className="speaker__name" tag="p" field={speaker.name} />
            <Text className="speaker__role" tag="p" field={speaker.role} />
          </a>
        </Link>
      ));

  return (
    <div className="section__speakers container">
      <h2 className="section__content__title">Other event speakers</h2>
      <div className="section__speakers__grid">{speakers}</div>
    </div>
  );
};

export default SpeakersGrid;
