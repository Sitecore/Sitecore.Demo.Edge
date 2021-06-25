import Link from 'next/link';
import React from 'react';

type Props = {
  preview: boolean;
};

const Header = ({ preview }: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="grid grid-rows-3 gap-4 min-w-full ">
        <div className="row-span-3 ...">
          <Link href="/">
            <a>
LOGO 
           </a>
          </Link>
        </div>
        <hr/>
        <div className="row-span-3 ...">
          <span className="text-4xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
            <a href="https://github.com/konabos/Next.js-Starter-kit-using-GraphQL-and-Sitecore-Content-Hub-Content-as-a-Service"></a>
          </span>
          - {`Preview Mode: ${preview}`}
<hr/>
        </div>
      </div>
    </section>
  );
};

export default Header;
