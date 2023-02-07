import Link from 'next/link';
import {
  Text,
  RichText,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { News } from 'src/types/news';

type SubpageListProps = ComponentProps & {
  fields: {
    items: News[];
  };
};

const SubpageList = (props: SubpageListProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasSubpages = !!props?.fields?.items?.length;

  !hasSubpages && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasSubpages && isPageEditing && <p>Missing Datasource Item</p>;

  const subpageCards =
    props.fields.items &&
    props.fields.items.map((news, index) => (
      <div key={index} className="news">
        <div className="text-container">
          <Text tag="div" className="news-title" field={news.fields.Title} />
          <RichText className="news-excerpt" field={news.fields.Excerpt} />
        </div>
        <div className="info-col-cta">
          <Link href={props.url.path}>
            <a className="btn-main">More Information</a>
          </Link>
        </div>
      </div>
    ));

  const subpageList = hasSubpages && (
    <section className="section section-news-list">
      <div className="container">
        <div className="content">{subpageCards}</div>
      </div>
    </section>
  );

  return (
    <>
      {subpageList}
      {pageEditingMissingDatasource}
    </>
  );
};

export default SubpageList;
