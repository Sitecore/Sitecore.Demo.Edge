import { fetchGraphQL } from '../../../api';
import { VenueResponse, VenueResult } from '../../../interfaces/schema';

export const getVenues = async (previewApiEnabled: boolean): Promise<{ venues: VenueResult[] }> => {
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

  const results: VenueResponse = (await fetchGraphQL(
    venuesQuery,
    previewApiEnabled
  )) as VenueResponse;

  const venues: VenueResult[] = results?.data?.allDemo_Venue?.results;

  return { venues: venues };
};

export const getVenueById = async (
  id: string,
  previewApiEnabled: boolean
): Promise<{ venue: VenueResult }> => {
  if (id == '0') return { venue: { id: '0', name: '', rooms: { results: [] } } };

  const { venues } = await getVenues(previewApiEnabled);

  return {
    venue: venues?.filter((v: VenueResult) => v.id == id)[0],
  };
};
