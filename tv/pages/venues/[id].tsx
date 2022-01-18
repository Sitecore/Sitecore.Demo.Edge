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

export default function VenuePage(props: VenueProps) {
  return <Venue venue={props.venue} />;
}

export async function getStaticPaths() {
  const { venues } = await getVenues(false);

  const paths =
    venues && venues.length > 0
      ? venues.map((venue) => ({
          params: { id: venue.id },
        }))
      : [{ params: { id: 'error' } }];

  return { paths, fallback: false };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: VenueParams) => {
  const { venue } = await getVenueById(params.id, false);

  return {
    props: {
      venue: venue,
    },
    revalidate: 10,
  };
};
