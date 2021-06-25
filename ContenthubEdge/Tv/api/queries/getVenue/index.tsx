import { fetchGraphQL } from '../..';
import { venueI } from '@/interfaces/index';
import { venuesParse } from '../sharedFunctions';

export const getVenue = async (
  preview: boolean,
  venue: string,
): Promise<{ venues: venueI[] }> => {
  try {
    const venuesQuery: any = `
    query {
      allEG_Venue (where: {taxonomyName: "${venue}"}) {
        results {
          id
          taxonomyName
          description
          venue_Room {
            results{
              id
              taxonomyName
              taxonomyLabel
              room_Timeslot{
                results{
                  id
                  taxonomyName
                }
              }
            }
          }
        }
      }
    }`;
    const venueFeed: any = await fetchGraphQL(venuesQuery, preview);
    const venueArray: venueI[] = venuesParse(venueFeed);
    console.log(venueArray);
    return {
      venues: venueArray,
    };
  } catch (err) {
    console.log(err);
    return {
      venues: [],
    };
  }
};
