import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Footer from 'components/footer';
import { dataI } from '@/interfaces/index';
import React from 'react';
import Header from 'components/header';
import { getVenues } from '@/api/queries/getVenues';
import { getVenue } from '@/api/queries/getVenue';

export default function Category(props: dataI) {
  return (
    <div className="container mx-auto px-5">
      <Head>
        <title>
          The Sitecore Experience Edge for Content Hub - Content as a Service!
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header preview={props.preview} />
      { <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        {props.venues?.length > 0
          ? props.venues.map((venue, index) => (
              <div key={index}>

              </div>
            ))
          : null}
      </section> }
      <Footer preview={props.preview} slug={props.slug} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  let slug = '';
  if (Array.isArray(params!.slug)) {
    slug = params!.slug.pop()!;
  } else {
    slug = params!.slug!;
  }

  const { venues } = await getVenue(preview, slug);
  return {
    props: {
      venues,
      preview,
      slug,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { venues } = await getVenues(true);
  const paths = venues
    .map((venue) => {
      return { params: { slug: venue.slug } };
    })
    .flat();
  return {
    paths: paths,
    fallback: false,
  };
};
