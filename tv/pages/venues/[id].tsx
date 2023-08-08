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
  const { venues } = await getVenues();

  const paths = venues.map((venue) => ({
    params: { id: venue.id },
  }));

  return { paths, fallback: false };
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
