import Link from 'next/link';
import {
  LayoutServicePageState,
  useSitecoreContext,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SubpageListProps = ComponentProps & {
  fields: {
    items: Item[];
  };
  url: string;
};

const SubpageList = (props: SubpageListProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasSubpages = !!props?.fields?.items?.length;

  !hasSubpages && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasSubpages && isPageEditing && <p>Missing Datasource Item</p>;

  const subpageItems =
    props.fields.items &&
    props.fields.items.map((item, index) => (
      <li key={index}>
          <Link key={index} href={item.url} passHref>
            <a className="subitem">
              {item?.name}
            </a>
          </Link>
      </li>
    ));

  const subpageList = hasSubpages && (
    <ul className="component navigation subpage-navigation">
      {subpageItems}
    </ul>
  );

  return (
    <>
      {subpageList}
      {pageEditingMissingDatasource}
    </>
  );
};

export default SubpageList;
