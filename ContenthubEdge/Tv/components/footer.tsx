import React from 'react';
import Link from 'next/link';

type Props = {
  preview: boolean;
  slug: string;
};

const Footer = ({ preview, slug }: Props) => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <hr/>
        {preview ? (
          <Link href="/api/exit-preview">
            <a className="font-bold">Exit Preview Mode</a>
          </Link>
        ) : (
          // <Link href={`/api/preview?slug=${encodeURIComponent(slug)}`}>
          <Link href={`/api/preview`}>
            <a className="font-bold">Enter Preview Mode</a>
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
