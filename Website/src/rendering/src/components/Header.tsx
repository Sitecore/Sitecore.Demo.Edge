import { Field, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

import Link from 'next/link';

type HeaderProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <>
      <div className="bg-black-lightest text-white">
        <div
          className="lg:container lg:mx-auto flex flex-wrap justify-end content-center px-4"
          style={{ height: '30px' }}
        >
          <a href="#" className="small">
            EN
          </a>
          <Link href="/account/login">
            <a className="small ml-1">Login</a>
          </Link>
        </div>
      </div>
      <Placeholder name="jss-header-content" rendering={props.rendering} />
    </>
  );
};

export default Header;
