import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

import Link from 'next/link';
import { useRouter } from 'next/router';

export type HeaderProps = ComponentProps;

const Header = (props: HeaderProps): JSX.Element => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLanguage = (lang: string) => {
    console.log(lang);

    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <>
      <div className="header-eyebrow">
        <div className="content">
          <select>
            <option value={'en'}>English</option>
            <option value={'fr-CA'}>French</option>
            <option value={'es'}>Espanol</option>
          </select>
          <button onClick={() => changeLanguage('da-Dk')}>da</button>
          <button onClick={() => changeLanguage('fr-CA')}>fr</button>
          <button onClick={() => changeLanguage('en')}>en</button>

          <Link href="/account/login" prefetch={false}>
            <a>Login</a>
          </Link>
          <Link href="/shop/checkout/cart" prefetch={false}>
            <a>Cart</a>
          </Link>
        </div>
      </div>
      <Placeholder name="jss-header-content" rendering={props.rendering} />
    </>
  );
};

export default Header;
