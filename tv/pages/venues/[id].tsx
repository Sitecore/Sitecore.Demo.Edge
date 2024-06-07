import { Params } from '../../interfaces';
import { VenueResult } from '../../interfaces/schema';
import React from 'react';
import Venue from '../../components/Venue';
import { getVenueById, getVenues } from '../../api/queries/getVenues';

type VenueProps = {
  venue: VenueResult;
};

export declare type VenueParams = {
  [param: string]: Params;
};

const VenuePage = (props: VenueProps) => {
  return <Venue venue={props.venue} />;
};

export async function getStaticPaths() {
  // Return empty paths because we don't want to generate anything on build
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: [],
    fallback: 'blocking',
  };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: VenueParams) => {
  const { venue } = await getVenueById(params.id);

  return {
    props: {
      venue: venue,
    },
    revalidate: 10,
  };
};

export default VenuePage;
