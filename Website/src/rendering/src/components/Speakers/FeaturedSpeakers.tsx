import {
  Text,
  Field,
  Image,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSpeaker } from 'src/types/speaker';
import Link from 'next/link';

export type FeaturedSpeakersProps = ComponentProps & {
  fields: {
    data: {
      source: {
        numberOfSpeakers: Field<number>;
      };
      item: {
        children: {
          results: GraphQLSpeaker[];
        };
      };
    };
  };
};

const getSpeakerNumberToShow = function (props: FeaturedSpeakersProps) {
  let numberOfSpeakers = props.fields.data.item.children.results.length;
  if (!!props.fields.data.source?.numberOfSpeakers?.value) {
    const providedNumberOfSpeakers = props.fields.data.source?.numberOfSpeakers?.value;
    if (!isNaN(providedNumberOfSpeakers) && providedNumberOfSpeakers > 0) {
      numberOfSpeakers = providedNumberOfSpeakers;
    }
  }
  return numberOfSpeakers;
};

const FeaturedSpeakers = (props: FeaturedSpeakersProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasSpeakers = !!props.fields?.data?.item;

  !hasSpeakers && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasSpeakers && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  const speakers =
    props.fields.data?.item?.children?.results &&
    props.fields.data.item.children.results
      .filter((item) => item.featured.value)
      .sort()
      .slice(0, getSpeakerNumberToShow(props))
      .map((speaker, index) => (
        <Link key={index} href={speaker.url.path} passHref>
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
                <Text tag="p" className="item-title" field={speaker.name} />
                <Text tag="p" field={speaker.jobTitle} />
              </div>
            </div>
          </a>
        </Link>
      ));

  const featuredSpeakers = hasSpeakers && (
    <div className="featured-speakers item-grid">
      <div className="grid-content">{speakers}</div>
    </div>
  );

  return (
    <>
      {featuredSpeakers}
      {pageEditingMissingDatasource}
    </>
  );
};

export default FeaturedSpeakers;
