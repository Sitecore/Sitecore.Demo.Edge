import Link from 'next/link';
import { ComponentProps } from 'lib/component-props';
import { SitecoreItem } from 'src/types/sitecoreItem';

type SubpageListProps = ComponentProps & {
  fields: {
    items: SitecoreItem[];
  };
};

const SubpageList = (props: SubpageListProps): JSX.Element => {
  const hasSubpages = !!props?.fields?.items?.length;

  if (!hasSubpages) {
    return <></>;
  }

  const subpageItems = props.fields.items.map((item, index) =>
    item ? (
      <li key={index}>
        <Link href={item.url} passHref>
          <a className="subitem">{item.name || item.url}</a>
        </Link>
      </li>
    ) : (
      <></>
    )
  );

  return (
    <div className="subpage-list">
      <ul>{subpageItems}</ul>
    </div>
  );
};

export default SubpageList;
