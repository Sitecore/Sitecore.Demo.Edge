import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { useEffect, useState } from 'react';
import { HeaderProps } from './Header';

export type HeaderContentProps = HeaderProps & {
  pathname?: string;
  asPath?: string;
  query?: string | ParsedUrlQueryInput;
};

const HeaderContent = (props: HeaderContentProps): JSX.Element => {
  const router = useRouter();
  const { sitecoreContext } = useSitecoreContext();
  const [languageLabels, setLanguageLabels] = useState([]);

  const languageNames = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  const languageList = sitecoreContext['Languages'] as NodeJS.Dict<string | string>[];

  useEffect(() => {
    const labels = languageList.map((language) => languageNames.of(language['Name']));

    setLanguageLabels(labels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const languageSelector = languageList && languageLabels.length > 0 && (
    <select
      onChange={(e) => changeLanguage(e.currentTarget.value)}
      className="languagePicker"
      defaultValue={sitecoreContext.language}
    >
      {languageList.map((language, index) => (
        <option
          key={index}
          value={language['Name']}
          label={languageLabels[index]}
          className="languageItem"
        >
          {languageNames.of(language['Name'])}
        </option>
      ))}
    </select>
  );

  const links = props.fields?.data?.item?.children?.results?.map((item, index) => (
    <Link key={index} href={item.field?.jsonValue?.value?.href ?? '#'} prefetch={false}>
      <a>{item.displayName}</a>
    </Link>
  ));

  return (
    <>
      <div className="header-eyebrow">
        <div className="content">
          {languageSelector}
          {links}
        </div>
      </div>
      <Placeholder name="jss-header-content" rendering={props.rendering} />
    </>
  );
};

export default HeaderContent;
