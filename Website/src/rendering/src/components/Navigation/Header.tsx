import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

import Link from 'next/link';

export type HeaderProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: [
            {
              displayName: string;
              field: {
                jsonValue: {
                  value: {
                    anchor: string;
                    href: string;
                    linktype: string;
                    target: string;
                    text: string;
                    url: string;
                  };
                };
              };
            }
          ];
        };
      };
    };
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <>
      <div className="header-eyebrow">
        <div className="content">
          <Link href="#" prefetch={false}>
            <a>EN</a>
          </Link>
          {props.fields?.data?.item?.children?.results?.map((item, index) => (
            <Link key={index} href={item.field?.jsonValue?.value?.href ?? '#'} prefetch={false}>
              <a>{item.displayName}</a>
            </Link>
          ))}
        </div>
      </div>
      <Placeholder name="jss-header-content" rendering={props.rendering} />
    </>
  );
};

export default Header;
