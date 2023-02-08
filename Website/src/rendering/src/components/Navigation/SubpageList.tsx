import Link from 'next/link';
import { Item } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SubpageListProps = ComponentProps & {
  fields: {
    items: Item[];
  };
  url: string;
};

const SubpageList = (props: SubpageListProps): JSX.Element => {
  const hasSubpages = !!props?.fields?.items?.length;

  const subpageItems =
    props.fields.items &&
    props.fields.items.map((item, index) => (
      <li key={index}>
        <Link key={index} href={item.url} passHref>
          <a className="subitem">{item?.name}</a>
        </Link>
      </li>
    ));

  const subpageList = hasSubpages && (
    <div className="component navigation subpage-navigation">
      <ul>{subpageItems}</ul>
    </div>
  );

  return <>{subpageList}</>;
};

export default SubpageList;
