import { VenueResult } from '../../interfaces/schema';
import { getVenues } from '../../api/queries/getVenues';
import React from 'react';
import Venue from '../../components/Venue';

type VenuesProps = {
  venues: VenueResult;
};

const Venues = (props: VenuesProps): JSX.Element => {
  return <Venue venue={props.venues} />;
};

// This also gets called at build time
export const getStaticProps = async () => {
  const { venues } = await getVenues();

  return {
    props: {
      venues: venues[1],
    },
    revalidate: 10,
  };
};

export default Venues;
