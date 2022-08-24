import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue } from 'lib/component-props';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { HeaderProps } from './Header';

export type HeaderContentProps = HeaderProps & {
  pathname?: string;
  asPath?: string;
  query?: string | ParsedUrlQueryInput;
};

const HeaderContent = (props: HeaderContentProps): JSX.Element => {
  const router = useRouter();
  const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();

  const languageNames = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  const languageList = sitecoreContext['Languages'] as NodeJS.Dict<string | string>[];

  const changeLanguage = (lang: string) => {
    if (props.pathname && props.asPath && props.query) {
      router.push(
        {
          pathname: props.pathname,
          query: props.query,
        },
        props.asPath,
        { locale: lang }
      );
    }
  };

  return (
    <>
      <div className="header-eyebrow">
        <div className="content">
          <select
            onChange={(e) => changeLanguage(e.currentTarget.value)}
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

export default HeaderContent;
