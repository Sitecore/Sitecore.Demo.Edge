import { Text, Field, Image, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';
import Link from 'next/link';

export type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      source: {
        title: Field<string>;
        content: Field<string>;
        callToActionLink: {
          jsonValue: LinkField;
        };
        numberOfSpeakers: Field<string>;
      };
      item: {
        children: {
          results: GraphQLSpeaker[];
        };
      };
    };
  };
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => {
  const speakers = props.fields.data.item.children.results
    .filter((item) => item.featured.value)
    .sort()
    .slice(0, parseInt(props.fields.data.source?.numberOfSpeakers?.value))
    .map((speaker, index) => (
      <Link key={index} href={`/speakers/${speaker.itemName}`}>
        <a>
          <div className="grid-item">
            <div className="item-image">
              <Image
                field={speaker.picture.jsonValue}
                alt={speaker.name.value}
                width={265}
                height={265}
                loading="lazy"
              />
            </div>
            <div className="item-details">
              <Text tag="p" className="speaker_name" field={speaker.name} />
              <Text tag="p" field={speaker.jobTitle} />
            </div>
          </div>
        </a>
      </Link>
    ));

  return (
    <div className="featured-speakers">
      <div className="item-grid">
        <div className="grid-content">{speakers}</div>
      </div>
    </div>
  );
};

export default FeaturedSpeakers;
