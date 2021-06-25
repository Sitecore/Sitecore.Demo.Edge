import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Footer from '@/components/footer';
import Venues from '@/components/Venues';
import { venueDataI } from '@/interfaces/index';
import Header from '@/components/header';
import { getVenues } from '@/api/queries/getVenues';

export default function Home(props: venueDataI) {
  return (
    <div className="container mx-auto px-5">
      <Head>
        <title>...</title>
      </Head>

      <Header preview={props.preview} />
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        {props.venues?.length > 0 ? <Venues venues={props.venues} /> : null}
      </section>
      <Footer preview={props.preview} slug="" />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { venues } = await getVenues(preview);
  return {
    props: {
      venues,
      preview,
    },
    revalidate: 1,
  };
};
