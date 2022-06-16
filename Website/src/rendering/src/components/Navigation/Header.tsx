import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, SitecoreContextValue } from 'lib/component-props';

import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();

  const languageNames = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  const languageList = sitecoreContext['Languages'] as NodeJS.Dict<string | string>[];

  const changeLanguage = (lang: string) => {
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <>
      <div className="header-eyebrow">
        <div className="content">
          <select
            onClick={(e) => changeLanguage(e.currentTarget.value)}
            className="languagePicker"
            defaultValue={sitecoreContext.language}
          >
            {languageList.map((language, index) => (
              <option
                key={index}
                value={language['Name']}
                label={languageNames.of(language['Name'])}
                className="languageItem"
              >
                {languageNames.of(language['Name'])}
              </option>
            ))}
          </select>

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
