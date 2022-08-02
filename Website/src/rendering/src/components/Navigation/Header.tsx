import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import HeaderContent from './HeaderContent';

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
                    anchor?: string;
                    href: string;
                    linktype?: string;
                    target?: string;
                    text?: string;
                    url?: string;
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
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return <HeaderContent pathname={pathname} asPath={asPath} query={query} {...props} />;
};

export default Header;
