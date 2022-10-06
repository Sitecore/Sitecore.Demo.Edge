import Link from 'next/link';
import {
  Text,
  Image,
  useSitecoreContext,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
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

  const speakersGrid = hasSpeakers && <div className="speakers-grid container">{speakers}</div>;

  return (
    <>
      {speakersGrid}
      {pageEditingMissingDatasource}
    </>
  );
};

export default SpeakersGrid;
