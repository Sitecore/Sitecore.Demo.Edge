import { fetchGraphQL } from '../../../api';
import { VenueResponse, VenueResult } from '../../../interfaces/schema';

export const getVenues = async (): Promise<{ venues: VenueResult[] }> => {
  const venuesQuery = `
    query {
      allDemo_Venue(first: 10) {
        results {
          id
          name
          rooms(first: 2) {
            results {
              id
              name
            }
          }
        }
      }
    }
    `;

  const results: VenueResponse = (await fetchGraphQL(venuesQuery)) as VenueResponse;

  const venues: VenueResult[] = results.data.allDemo_Venue.results;

  return { venues: venues };
};

export const getVenueById = async (id: string): Promise<{ venue: VenueResult }> => {
  const { venues } = await getVenues();

  return {
    venue: venues.filter((v: VenueResult) => v.id == id)[0],
  };
};
