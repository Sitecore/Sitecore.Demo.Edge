import Link from 'next/link';
import { ComponentProps } from 'lib/component-props';
import { SitecoreItem } from 'src/types/sitecoreItem';

type SubpageListProps = ComponentProps & {
  fields: {
    items: SitecoreItem[];
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
